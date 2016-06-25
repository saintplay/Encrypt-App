var previous_input;

function populate_character_frequency_hash(input_to_handle)
{
	var character_frequency_hash = {};
	for (var i = 0; i < input_to_handle.length; i++) {
		var character = input_to_handle.charAt(i);
		if ( character_frequency_hash[character] === undefined ) {
			character_frequency_hash[character] = 1;
		} else {
			var current_character_frequency = character_frequency_hash[character];
			character_frequency_hash[character]++;
		}
	}
	return character_frequency_hash;
}

function fill_huffman_priority_queue(character_frequency_hash)
{
	var queue_to_fill = new huffman_priority_queue();
	for ( var hash_key in character_frequency_hash ) {
		var new_node = new_huffman_leaf_node(
			hash_key,
			character_frequency_hash[ hash_key ]
		);
		queue_to_fill.insert(new_node);
	}
	return queue_to_fill;
}

function huffman_priority_queue()
{
	this.queue = new Array(null);
	this.ROOT = 1;
	this.insert = function(new_node)
	{
		this.queue.push(new_node);
		for (
			var node_location = this.queue.length - 1;
			node_location > this.ROOT;
			node_location = Math.floor(node_location/2)
		) {
			if (
				this.is_less_than(
					this.queue[node_location],
					this.queue[Math.floor(node_location/2)]
				)
			) {
				this.swap(node_location, Math.floor(node_location/2));
			}
		}
	};
	this.is_less_than = function(one_node, another_node)
	{
		if (one_node == undefined || another_node == undefined) {
			return false;
		}
		if (one_node.frequency < another_node.frequency) {
			return true;
		} else if (one_node.frequency > another_node.frequency) {
			return false;
		} else if (one_node.character < another_node.character) {
			return true;
		} else {
			return false;
		}
	};
	this.swap = function(node_location, node_destination)
	{
		var temporary_node = this.queue[node_location];
		this.queue[node_location] = this.queue[node_destination];
		this.queue[node_destination] = temporary_node;
	};
	this.remove_smallest_frequecy_node = function()
	{
		var smallest_frequency_node = this.queue[this.ROOT];
		var last_node_test = this.queue.pop();
		if (this.queue.length > this.ROOT) {
			this.queue[this.ROOT] = last_node_test;
		}
		var node_location = this.ROOT;
		while (node_location < this.queue.length - 1) {
			var left_child_node_location = (node_location*2);
			var right_child_node_location = ((node_location*2) + 1);
			var left_child_less_than_right;
			if (this.queue[right_child_node_location] == undefined) {
				left_child_less_than_right = true;
			} else if (
				this.is_less_than(
					this.queue[left_child_node_location],
					this.queue[right_child_node_location]
				)
			) {
				left_child_less_than_right = true;
			} else {
				left_child_less_than_right = false;
			}
			if (
				left_child_less_than_right
				&&
				this.is_less_than(
					this.queue[left_child_node_location],
					this.queue[node_location]
				)
			) {
				this.swap(left_child_node_location, node_location);
			} else if (
				! left_child_less_than_right
				&&
				this.is_less_than(
					this.queue[right_child_node_location],
					this.queue[node_location]
				)
			) {
				this.swap(right_child_node_location, node_location);
			} else {
				break;
			}
		}
		return smallest_frequency_node;
	};
}

function new_huffman_leaf_node(character, frequency)
{
	return new huffman_node(character, frequency, 'Leaf', null, null);
}

function huffman_node(character, frequency, type, child_left, child_right)
{
	this.character = character;
	this.frequency = frequency;
	this.type = type;
	this.child_left = child_left;
	this.child_right = child_right;
}

function build_huffman_tree(huffman_priority_queue)
{
	var counter = 0;
	while (huffman_priority_queue.queue.length - 1 > huffman_priority_queue.ROOT) {
		var temporary_left_node = huffman_priority_queue.remove_smallest_frequecy_node();
		var temporary_right_node = huffman_priority_queue.remove_smallest_frequecy_node();
		var new_node_frequency = temporary_left_node.frequency + temporary_right_node.frequency;
		var temporary_body_node = new_huffman_body_node(new_node_frequency, temporary_left_node, temporary_right_node);
		huffman_priority_queue.insert(temporary_body_node);
	}
	return huffman_priority_queue.queue[huffman_priority_queue.ROOT];
}

function new_huffman_body_node(frequency, child_left, child_right)
{
	return new huffman_node('', frequency, 'Body', child_left, child_right);
}

function Huffman_Encoding_Table()
{
	this.binary_output = '';
	this.table = new Array();
	this.character_encoding_hash = {};
	this.generate_encoding_table_recursively = function(huffman_tree)
	{
		if (huffman_tree.type == 'Leaf') {
			this.add_table_entry(huffman_tree.character, huffman_tree.frequency, this.binary_output);
			this.binary_output = this.binary_output.substring(0, this.binary_output.length - 1);
			return;
		}
		this.binary_output += '0';
		this.generate_encoding_table_recursively(huffman_tree.child_left);
		this.binary_output += '1';
		this.generate_encoding_table_recursively(huffman_tree.child_right);
		this.binary_output = this.binary_output.substring(0, this.binary_output.length - 1);
	};
	this.add_table_entry = function(new_character, new_frequency, new_binary)
	{
		var new_encoding_table_entry = new Array(new_character, new_frequency, new_binary);
		this.table.push(new_encoding_table_entry);
	};
	this.toString = function()
	{
		var text_output = '';
		for ( var i in this.table ) {
			var table_row = this.table[ i ];
			var character = table_row[0];
			var frequency = table_row[1];
			var code = table_row[2];

			if (character == " ")
				character = " ";
			else if (character == "\n")
				character = "↓";

			text_output += character + " (" + frequency + ") " + code + "\n";
		}
		text_output = text_output.substring(0, text_output.length - 1);
		return text_output;
	};
	this.set_character_encoding_hash = function()
	{
		this.character_encoding_hash = {};
		var table_character_index = 0;
		var table_encoding_index = 2;
		for ( var i in this.table ) {
			var table_row = this.table[ i ];
			this.character_encoding_hash[table_row[table_character_index]] = table_row[table_encoding_index];
		}
	};
	this.encode_text = function(text_to_encode)
	{
		var encoded_text = '';
		for (var i = 0; i < text_to_encode.length; i++) {
			encoded_text += this.character_encoding_hash[text_to_encode.charAt(i)];
		}
		return encoded_text;
	};
}

function decode_input()
{
	var encoded_table_input = document.getElementById('encoded-table').value.split('\n');
	encoded_table_input = merge_literal_newline_rows( encoded_table_input );
	var huffman_encoding_table = populate_huffman_encoding_table( encoded_table_input );
	var decoded_output = generate_decoded_output( huffman_encoding_table );
	document.getElementById('decoded-output').value = decoded_output;
}

function merge_literal_newline_rows( encoded_table_input )
{
	var new_encoded_table_input = [];
	for ( var i = 0; i < encoded_table_input.length; i++ ) {
		var table_row = encoded_table_input[ i ];
		if (table_row == '' && encoded_table_input[i + 1].match(/^ /)) {
			new_encoded_table_input.push( '\n' + encoded_table_input[i + 1] );
			i++;
		} else {
			new_encoded_table_input.push( table_row );
		}
	}
	return encoded_table_input;
}

function populate_huffman_encoding_table( encoded_table_input )
{
	var huffman_encoding_table = new Huffman_Encoding_Table();
	for ( var i in encoded_table_input ) {
		var table_row = encoded_table_input[ i ];
		if (table_row == '') {
			continue;
		} else if (table_row == ' ') {
			huffman_encoding_table.add_table_entry('\n', null, table_row.match(/\d+$/)[0]);
		} else {
			huffman_encoding_table.add_table_entry(table_row.charAt(0), null, table_row.match(/\d+$/)[0]);
		}
	};
	return huffman_encoding_table;
}

function generate_decoded_output( huffman_encoding_table )
{
	var decoded_output = '';
	var encoded_output = document.getElementById('encoded-output').value;
	var encoding_table_character_index = 0;
	var encoding_table_binary_index = 2;
	while (encoded_output.length > 0) {
		for (var i = 0; i < encoded_output.length; i++) {
			var current_binary = encoded_output.substring(0, i + 1);
			for (var table_row_index = 0; table_row_index < huffman_encoding_table.table.length; table_row_index++) {
				if (current_binary == huffman_encoding_table.table[table_row_index][encoding_table_binary_index]) {
					decoded_output += huffman_encoding_table.table[table_row_index][encoding_table_character_index];
					encoded_output = encoded_output.substring(i + 1, encoded_output.length);
					i = -1;
					break;
				}
			}
		}
	}
	return decoded_output;
}