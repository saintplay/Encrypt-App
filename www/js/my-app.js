var myApp;
var $$;
var mainView;


var tabla_ascii = {
    '0':   48, '1':   49, '2':   50, '3':   51, '4':   52, '5':   53, '6':   54, '7':   55,
    '8':   56, '9':   57, '☺': 9786, '☻': 9787, '•': 8226, '◘': 9688, '○': 9675, '◙': 9689,
    '♂': 9794, '♀': 9792, '♪': 9834, '♫': 9835, '☼': 9788, '►': 9658, '◄': 9668, '‼': 8252,
    '▬': 9644, '↨': 8616, '↑': 8593, '↓': 8595, '→': 8594, '←': 8592, '∟': 8735, '▲': 9650,
    '▼': 9660, '!':   33, '\'':  34, '#':   35, '$':   36, '%':   37, '&':   38, '(':   40,
    ')':   41, '*':   42, '+':   43, ',':   44, '-':   45, '.':   46, '/':   47, '⌂': 8962,
    '░': 9617, '▒': 9618, '▓': 9619, ':':   58, ';':   59, '<':   60, '=':   61, '>':   62,
    '?':   63, '@':   64, 'A':   65, 'B':   66, 'C':   67, 'D':   68, 'E':   69, 'F':   70,
    'G':   71, 'H':   72, 'I':   73, 'J':   74, 'K':   75, 'L':   76, 'M':   77, 'N':   78,
    'Ñ':  209, 'O':   79, 'P':   80, 'Q':   81, 'R':   82, 'S':   83, 'T':   84, 'U':   85,
    'V':   86, 'W':   87, 'X':   88, 'Y':   89, 'Z':   90, '[':   91, ']':   93, '^':   94,
    '_':   95, '`':   96, 'a':   97, 'b':   98, 'c':   99, 'd':  100, 'e':  101, 'f':  102,
    'g':  103, 'h':  104, 'i':  105, 'j':  106, 'k':  107, 'l':  108, 'm':  109, 'n':  110,
    'ñ':  241, 'o':  111, 'p':  112, 'q':  113, 'r':  114, 's':  115, 't':  116, 'u':  117,
    'v':  118, 'w':  119, 'x':  120, 'y':  121, 'z':  122, '{':  123, '|':  124, '}':  125,
    '~':  126, '¡':  161, '¢':  162, '£':  163, '¤':  164, '¥':  165, '¦':  166, '§':  167,
    '¨':  168, '©':  169, 'ª':  170, '«':  171, '¬':  172, '®':  174, '¯':  175, '°':  176,
    '±':  177, '²':  178, '³':  179, '´':  180, 'µ':  181, '¶':  182, '·':  183, '¸':  184,
    '¹':  185, 'º':  186, '»':  187, '¼':  188, '½':  189, '¾':  190, '¿':  191, 'À':  192,
    'Á':  193, 'Â':  194, 'Ã':  195, 'Ä':  196, 'Å':  197, 'Æ':  198, 'Ç':  199, 'È':  200,
    'É':  201, 'Ê':  202, 'Ë':  203, 'Ì':  204, 'Í':  205, 'Î':  206, 'Ï':  207, 'Ð':  208,
    'Ò':  210, 'Ó':  211, 'Ô':  212, 'Õ':  213, 'Ö':  214, '×':  215, 'Ø':  216, 'Ù':  217,
    'Ú':  218, 'Û':  219, 'Ü':  220, 'Ý':  221, 'Þ':  222, 'ß':  223, 'à':  224, 'á':  225,
    'â':  226, 'ã':  227, 'ä':  228, 'å':  229, 'æ':  230, 'ç':  231, 'è':  232, 'é':  233,
    'ê':  234, 'ë':  235, 'ì':  236, 'í':  237, 'î':  238, 'ï':  239, 'ð':  240, 'ò':  242,
    'ó':  243, 'ô':  244, 'õ':  245, 'ö':  246, '÷':  247, 'ø':  248, 'ù':  249, 'ú':  250,
    'û':  251, 'ü':  252, 'ý':  253, 'þ':  254, 'ÿ':  255, 'Ā':  256, 'ā':  257, 'Ă':  258,
    'ă':  259, 'Ą':  260, 'ą':  261, 'Ć':  262, 'ć':  263, 'Ĉ':  264, 'ĉ':  265, 'Ċ':  266,
    'ċ':  267, 'Č':  268, 'č':  269, 'Ď':  270, 'ď':  271, 'Đ':  272, 'đ':  273, 'Ē':  274,
    'ē':  275, 'Ĕ':  276, 'ĕ':  277, 'Ė':  278, 'ė':  279, 'Ę':  280, 'ę':  281, 'Ě':  282,
    'ě':  283, 'Ĝ':  284, 'ĝ':  285, 'Ğ':  286, 'ğ':  287, 'Ġ':  288, 'Ⴖ': 4278, 'Ⴗ': 4279,
    'Ⴘ': 4280, 'Ⴙ': 4281, 'Ⴚ': 4282,'Ⴛ': 4283, 'Ⴜ': 4284, 'Ⴝ': 4285, 'Ⴞ': 4286, 'Ⴟ':  428
}

// Arreglo que contendrá los 256 números de forma ordenada
var caracteres_aceptados = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q",
    "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

var papus_ordenados = [];
var abecedario = [];

// Ponemos los números en el arreglo
for (var i = 0; i < 256; i++)
    papus_ordenados.push(Object.keys(tabla_ascii)[i]);


/*
    ******************************
    * ACA DECLARAMOS LOS EVENTOS *
    ******************************
*/

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function activarEventos() {
    $$('#boton-para-encriptar').on('touchend', encriptarTexto);
    $$('#boton-para-desencriptar').on('touchend', desencriptarTexto);
    $$('#boton-para-refrescar').on('touchend', generarNuevaTabla);
    $$('#boton-para-comprimir').on('touchend', comprimirTexto);
}

function desactivarEventos() {
    $$('#boton-para-encriptar').off('touchend', encriptarTexto);
    $$('#boton-para-desencriptar').off('touchend', desencriptarTexto);
    $$('#boton-para-refrescar').off('touchend', generarNuevaTabla);
    $$('#boton-para-comprimir').off('touchend', comprimirTexto);
}

function onDeviceReady() {
    // Inicializando variables de Framework7
    myApp = new Framework7({
        animateNavBackIcon:true
    });
    mainView = myApp.addView('.view-main', {
        dynamicNavbar: true,
        domCache: true
    });

    $$ = Dom7;

    $$('.resultados-container').hide();
    $$('#codificacion-resultados').hide();
    generarTabla();

    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    //Creamos el evento click que generará una nueva tabla
    $$('a[href*=view-desencriptar]').touchend(() => { $$("#text-area-desencriptar").change(); })
    $$('a[href*=view-comprimir]').touchend(() => { $$("#text-area-comprimir").change(); })
    activarEventos();
}

function onPause() {
    desactivarEventos();
}

function onResume() {
    activarEventos();
}


/*
    ********************************
    * ACA DECLARAMOS LAS FUNCIONES *
    ********************************
*/

function generarTabla() {

    abecedario = [];
    var papus = [];

    // Hacemos una copia de los papus ordenados con 'slice'
    papus = papus_ordenados.slice();

    // Movemos 2 papus a cada letra
    for (var i=0; i<caracteres_aceptados.length; i++) {

        var letra = [];

        //8 caracteres en cada letra
        letra.push(papus.pop());
        letra.push(papus.pop());
        letra.push(papus.pop());
        letra.push(papus.pop());
        letra.push(papus.pop());
        letra.push(papus.pop());
        letra.push(papus.pop());
        letra.push(papus.pop());

        if (i < 20) {
            letra.push(papus.pop());
            letra.push(papus.pop());
        }

        abecedario.push(letra);
    }

    var tabla = $$('#tabla-de-papus');

    // Limpiamos la tabla, porsiacaso
    tabla.text("");


    for(var i = 0; i < caracteres_aceptados.length; i++) {

        var letra = abecedario[i];
        tabla.text(tabla.text() + '<tr><td><b>' + caracteres_aceptados[i] + '</b></td>');

        for (var j = 0; j < 10; j++) {
            var caracter = letra[j] || "";
            tabla.text(tabla.text() + '<td>' + caracter + '</td>')
        }

        tabla.text(tabla.text() + '</tr>');
    }

    tabla.html(tabla.text());

}

function generarNuevaTabla(e) {

    e.preventDefault();

    abecedario = [];
    var papus = [];

    // Hacemos una copia de los papus ordenados con 'slice'
    papus = papus_ordenados.slice();

    // Desordenamos a los papus
    vamo_a_desordenarno(papus);

    // Ahora los papus estan en desorden
    // Que empieze el descontrol!!!

    // Movemos 2 papus a cada letra
    for (var i=0; i<caracteres_aceptados.length; i++) {

        var letra = [];

        letra.push(papus.pop());
        letra.push(papus.pop());

        abecedario.push(letra);
    }

    // Ya sacamos 54 papus, nos quedan 202, tenemos que
    // distribuirlos de manera aleatoria
    for (var i = 1; i <= 202; i++) {

        // Sacamos a un papu del grupo
        var  papu_alone = papus.pop();

        // Escogemos la letra a la irá papu alone
        // Validando que no pasen de 15 papus por letra
        var letra;

        do {
            var posicion_random = Math.floor(Math.random() * 27);
            letra = abecedario[posicion_random];
        }
        while(letra.length === 15);

        letra.push(papu_alone);
    }

    var tabla = $$('#tabla-de-papus');

    // Limpiamos la tabla, porsiacaso
    tabla.text("");


    for(var i = 0; i < caracteres_aceptados.length; i++) {

        var letra = abecedario[i];
        tabla.text(tabla.text() + '<tr><td><b>' + caracteres_aceptados[i] + '</b></td>');

        for (var j = 0; j < 15; j++) {
            var caracter = letra[j] || " ";
            tabla.text(tabla.text() + '<td>' + caracter + '</td>')
        }

        tabla.text(tabla.text() + '</tr>');
    }

    tabla.html(tabla.text());

}

// Desordena a los papus de forma aleatoria
function vamo_a_desordenarno(arreglo) {
    var j, x, i;
    for (i = arreglo.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = arreglo[i - 1];
        arreglo[i - 1] = arreglo[j];
        arreglo[j] = x;
    }
}

function encriptarTexto(e) {

    e.preventDefault();
    var texto = $$("#text-area-encriptar").val();

    if (!/\S/.test(texto)) {
        myApp.alert("No has ingresado ningún texto","¡Atención!");
        return;
    }

    var texto_uper_case = texto.toUpperCase();
    var caracteres_no_aceptados = false;

    var texto_encriptado = "";

    for (var i = 0; i < texto_uper_case.length; i++) {

        var caracter = texto_uper_case[i];

        if (caracter === " ") {
           texto_encriptado += " ";
           continue;
        } else if (caracter === "\n") {
            texto_encriptado += "\n";
            continue;
        } else if (caracteres_aceptados.indexOf(caracter) == -1) {
            texto_encriptado += " ";
            caracteres_no_aceptados = true;
            continue;
        }

        var index = caracteres_aceptados.indexOf(caracter);
        var caracter_encriptado = abecedario[index].shift(0);
        abecedario[index].push(caracter_encriptado);
        texto_encriptado += caracter_encriptado;
    }

    if (caracteres_no_aceptados)
        myApp.alert("Se han omitido algunos caracteres. Para esta opción no puedes usar acentos ni otros caracteres.","¡Cuidado!");

    $$('#view-encriptar').find('.resultados-container').show();
    $$('#texto-encriptado').text(texto_encriptado);
    $$("#text-area-desencriptar").val(texto_encriptado);
    $$("#text-area-comprimir").val(texto);
}

function desencriptarTexto(e) {

    e.preventDefault();
    var texto_encriptado = $$("#text-area-desencriptar").val();

    var texto_desencriptado = "";
    var caracteres_no_aceptados = false;

    if (!/\S/.test(texto_encriptado)) {
        myApp.alert("No has ingresado ningún texto","¡Atención!");
        return;
    }

    for (var j = 0; j < texto_encriptado.length; j++) {

        var caracter = texto_encriptado[j];

        if (caracter === " ") {
           texto_desencriptado += " ";
           continue;
        } else if (caracter === "\n") {
            texto_desencriptado += "\n";
            continue;
        }

        var caracter_encontrado = false;

        for (var i=0; i < abecedario.length; i++) {

            var letra = abecedario[i];

            if(letra.indexOf(caracter) > -1) {
               texto_desencriptado += caracteres_aceptados[i];
               caracter_encontrado = true;
               break;
            }
        }

        if (!caracter_encontrado) {
            texto_desencriptado += " ";
            caracteres_no_aceptados = true;
        }
    }

    if (caracteres_no_aceptados)
        myApp.alert("Si ves este mensaje, no se encripto adecuadamente el texto. Por favor envía capturas del texto y de la tabla al desarollador","WTF");

    $$('#view-desencriptar').find('.resultados-container').show();
    $$('#texto-desencriptado').text(texto_desencriptado);
}

function comprimirTexto(e) {
    e.preventDefault();
    var texto_a_comprimir = $$('#text-area-comprimir').val();

    if (texto_a_comprimir == previous_input) {
        return true;
    }

    previous_input = texto_a_comprimir;

    var character_frequency_hash = populate_character_frequency_hash(texto_a_comprimir);
    var huffman_priority_queue = fill_huffman_priority_queue(character_frequency_hash);
    var huffman_tree = build_huffman_tree(huffman_priority_queue);
    var huffman_encoding_table = new Huffman_Encoding_Table();
    huffman_encoding_table.generate_encoding_table_recursively(huffman_tree);

    $$('#codificacion-resultados').show();

    $$('#text-area-codificado').val(huffman_encoding_table.toString());
    $$("#text-area-codificado").change();

    huffman_encoding_table.set_character_encoding_hash();
    $$('#text-area-comprimido-resultado').val(huffman_encoding_table.encode_text(texto_a_comprimir));
    $$('#text-area-comprimido-resultado').change();
}