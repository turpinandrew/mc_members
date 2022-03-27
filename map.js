/*
    First draft at a dynamic look at members of MC.

    Author: Andrew Turpin (aturpin@unimelb.edu.au)
    Date: Sat 26 Mar 2022 08:21:32 AEDT
*/

const DATA_STR = `Name,Home,X,Y,Radius,Show,Theme1,Theme2,Theme3,Theme4,Theme5
"Super1",Background,364,204,550,true,Co-located Partners,,,,
"Super2",Background,1124,218,200,true,Others,,,,
"Super3",Background,1542,206,330,true,The Faculty of Engineering & IT,,,,
"Super4",Background,230,852,280,true,The Melbourne Entrepreneurial Centre,,,,
"Super5",Background,842,836,230,true,Specialised Environments,,,,
"Super6",Background,1484,862,630,true,Univeristy of Melbourne Interdisciplinary Research Groups,,,,
"ClarkeHopkinsClarke",Yellow,124,74,25,true,Our Environment,Citizens & Government,Cities & Infrastructure,,
"UST",Yellow,568,44,25,true,Our Environment,Citizens & Government,Our Future Economy,Health & Wellbeing,Cities & Infrastructure
"ANZSOG",Yellow,688,154,25,true,Our Environment,Citizens & Government,Our Future Economy,Health & Wellbeing,Cities & Infrastructure
"The Conversation",Yellow,534,168,25,true,Our Environment,Citizens & Government,Our Future Economy,Health & Wellbeing,Cities & Infrastructure
"MAXONIQ",Yellow,248,190,25,true,Health & Wellbeing,,,,
"InEight",Yellow,320,74,25,true,Cities & Infrastructure,,,,
"Apromore",Yellow,90,230,25,true,Our Future Economy,,,,
"Atomos",Yellow,156,378,25,true,Our Future Economy,,,,
"EMT Partners",Yellow,316,484,25,true,Our Future Economy,,,,
"4DMedical",Yellow,530,460,25,true,Health & Wellbeing,,,,
"Seer",Yellow,646,302,25,true,Health & Wellbeing,,,,
"SANE Australia",Yellow,284,302,25,true,Citizens & Government,Health & Wellbeing,,,
"Contemplative Studies\nCentre",Blue,1646,832,25,true,Citizens & Government,Health & Wellbeing,,,
"Melbourne Energy\nInstitute",Blue,1668,402,25,true,Our Environment,Citizens & Government,Cities & Infrastructure,,
"College for Climate\n& Energy",Blue,1536,728,25,true,Our Environment,Citizens & Government,Cities & Infrastructure,,
"Melbourne Climate\nFutures",Blue,1142,852,25,true,Our Environment,Citizens & Government,Cities & Infrastructure,,
"Complex Human\nData Hub",Blue,1814,810,25,true,Citizens & Government,Health & Wellbeing,,,
"Australian Centre\nfor Accelerating\nDiabetes Innovation",Blue,1210,656,25,true,Health & Wellbeing,,,,
"Centre for Data Science",Blue,1146,984,25,true,Citizens & Government,Our Future Economy,Health & Wellbeing,Cities & Infrastructure,
"ARC Training Centre in Optimisation\nTechnologies, Integrated\nMethodologies and Applications",Blue,1730,594,25,true,Our Environment,Our Future Economy,Health & Wellbeing,Cities & Infrastructure,
"Centre for Digital\nTransformation of Health",Blue,1758,946,25,true,Health & Wellbeing,,,,
"Centre for AI\nand Digital Ethics",Blue,1416,432,25,true,Our Environment,Citizens & Government,Our Future Economy,Health & Wellbeing,Cities & Infrastructure
"ARC Training Centre\nin Cognitive Computing\nfor Medical Technologies",Blue,1520,928,25,true,Health & Wellbeing,,,,
"Centre for Spatial Data\nInfrastructure and\nLand Administration",Grey,1732,82,25,true,Citizens & Government,Cities & Infrastructure,,,
"Melbourne Defence\nEnterprise",Grey,1706,260,25,true,Citizens & Government,Cities & Infrastructure,,,
"Centre for Disaster\nManagement & Public Safety",Grey,1482,76,25,true,Our Environment,Citizens & Government,Health & Wellbeing,Cities & Infrastructure,
"Melbourne Data\nAnalytics Platform",Blue,1344,810,25,true,Our Environment,Citizens & Government,Our Future Economy,Health & Wellbeing,Cities & Infrastructure
"Telstra Creator\nSpace",Orange,1264,156,40,true,Our Environment,Our Future Economy,Health & Wellbeing,Cities & Infrastructure,
"Science Gallery\nMelbourne",Teal,1086,294,40,true,Our Environment,Citizens & Government,Our Future Economy,Health & Wellbeing,Cities & Infrastructure
"Froebel Early\nLearning Centre",Green,1074,102,40,true,Our Environment,Health & Wellbeing,,,
"Digital Health\nValiditron",Pink,836,722,25,true,Health & Wellbeing,,,,
"D-Lab: Digital\nTwin Solutions",Pink,704,804,25,true,Our Environment,Citizens & Government,Our Future Economy,Health & Wellbeing,Cities & Infrastructure
"User Experience\nLab",Pink,812,900,25,true,Our Environment,Citizens & Government,Our Future Economy,Health & Wellbeing,Cities & Infrastructure
"Melbourne Accelerator\nProgram",Purple,316,728,25,true,Our Environment,Citizens & Government,Our Future Economy,Health & Wellbeing,Cities & Infrastructure
"Translating Research\nat Melbourne",Purple,192,972,25,true,Our Environment,Citizens & Government,Our Future Economy,Health & Wellbeing,Cities & Infrastructure
"Wade Institute of\nEntrereneurship",Purple,350,890,25,true,Our Environment,Citizens & Government,Our Future Economy,Health & Wellbeing,Cities & Infrastructure
"Co-located\nPartners",Yellow,450,300,0,true,,,,,
"The Faculty of\nEngineering & IT",Grey,1528,200,0,true,,,,,
"The Melbourne\nEntrepreneurial\nCentre",Purple,108,850,0,true,,,,,
"Specialised\nEnvironments",Pink,960,820,0,true,,,,,
"Univeristy of Melbourne\nInterdisciplinary\nResearch Groups",Blue,1400,610,0,true,,,,,
`;
g_data = $.csv.toObjects(DATA_STR);

const ALPHA = { "0": 1.0, "25" : 0.8, "40" : 1.0};                   // rgb alpha values for small (25) and big (40) radii
const FONT  = { "0": "12px Helvetica", "25" : "10px Arial", "40" : "13px Arial"}; // font sizes for groups (0) small (25) and big (40) radii
const SCALE = { "0": 0, "25" : 1.0, "40" : 0.9};                   // scale radii of circle

    // 'alpha' is determined by either a big or small radius from ALPHA
var g_cols = [];
g_cols["Background"] = "rgba(238, 236, 230, 0.7)";
g_cols["Yellow"] =     "rgb(227, 162, 0, alpha)";
g_cols["Purple"] =     "rgb(118, 52, 192, alpha)";
g_cols["Pink"] =       "rgb(208, 0, 50, alpha)";
g_cols["Blue"] =       "rgb(0, 84, 187, alpha)";
g_cols["Green"] =      "rgb(0, 129, 51, alpha)";
g_cols["Orange"] =     "rgb(229, 81, 0, alpha)";
g_cols["Teal"] =       "rgb(0, 156, 167, alpha)";
g_cols["Grey"] =       "rgb(115, 115, 115, alpha)";

var g_check_to_dot = [];   // g_check_to_dot[n] is an array of dot numbers that have the theme associated with box id=n
var g_boxids = []; 

const CX = get_xmax() / 2;
const CY = get_ymax() / 2;

/*
    Loop through the Theme columns to get unique theme names
    Create a checkbox for each in <div id="checkboxes">
    Store the checkbox number in g_themes[theme text]
*/
window.onload = function() {
    var keys = Object.keys(g_data[0]).filter(function(key) {
        return key.indexOf("Theme") === 0; // filter keys that start with "name"
    });

    var themes = [] ;
    keys.forEach(function(col) { 
        for (i = 0 ; i < g_data.length ; i++) {
            var row = g_data[i];
            if (row[col].length > 0 && row[col].substring(0, 5) != "Super") {
                if (g_data[i].Name.substring(0, 5) != "Super") {
                    themes[row[col]] = true;
                    (g_check_to_dot[row[col]] ??= []).push(i);   // g_c is indexed by text of theme here
                }
            }
        }
    });

        // create checkboxes
    var myDiv = document.getElementById("checkboxes");
    keys = Object.keys(themes).sort();
    for(i = 0 ; i < keys.length ; i++) {
        var box = document.createElement("input");
        box.type = "checkbox";
        box.id = "box".concat(i);
        box.checked = true;
        box.onclick = function() { draw_canvas(); };
        myDiv.appendChild(box);

        var lab = document.createElement("label");
        lab.htmlFor = box.id;
        lab.innerHTML = keys[i];
        myDiv.appendChild(lab);
        myDiv.appendChild(document.createElement("br"));

        g_check_to_dot[box.id] = g_check_to_dot[keys[i]];
        g_boxids.push(box.id);
    }

        // set legend colors
/*
    document.getElementById("label-clp").style.color = g_cols["Yellow"].replace("alpha", 1.0);
    document.getElementById("label-mec").style.color = g_cols["Purple"].replace("alpha", 1.0);
    document.getElementById("label-feit").style.color = g_cols["Grey"].replace("alpha", 1.0);
    document.getElementById("label-uom").style.color = g_cols["Blue"].replace("alpha", 1.0);
    document.getElementById("label-spc").style.color = g_cols["Pink"].replace("alpha", 1.0);
*/

    draw_canvas();
}

/*
    Draw all the dots and Names. 
    if Name == 'Super...' 
        Use the radius as given and ignore any text.
    else
        Determine dot size  from SCALE (indexed by Radius)
        Determine font size from FONT (indexed by Radius)
        Determine alpha     from ALPHA (indexed by Radius)

        If Show is not true for a g_data dot then overide FONT and ALPHA to blur it out
*/
function draw_members(ctx) { 
    g_data.forEach(function(dot) { dot.Show = dot.Name.substring(0, 5) == "Super"; });
    g_boxids.forEach(function(bid) {
        if (document.getElementById(bid).checked) {
            g_check_to_dot[bid].forEach(function(i) { g_data[i].Show = true; });
        }
    });

    for (var i = 0 ; i < g_data.length ; i++) {
        const x = scale(parseFloat(g_data[i].X));
        const y = yscale(parseFloat(g_data[i].Y));
        var rad = scale(parseFloat(g_data[i].Radius));

        if (g_data[i].Name.substring(0, 5) == "Super") {
            draw_circle(ctx, x, y, rad, g_cols[g_data[i].Home]);
        } else {
            var col = g_cols[g_data[i].Home];
            if (g_data[i].Show) {
                col = col.replace("alpha", ALPHA[g_data[i].Radius]);
            } else {
                col = col.replace("alpha", 0.1);
            }

            rad = rad * SCALE[g_data[i].Radius];

            draw_circle(ctx, x, y, rad, col);

            ctx.font = FONT[g_data[i].Radius];
            if (g_data[i].Radius == '0') {
                ctx.fillStyle = g_cols[g_data[i].Home].replace("alpha", 1.0);
            } else {
                ctx.fillStyle = "black";
            }
            ctx.textAlign = "center";
            mline_text(ctx, g_data[i].Name, x, y + 1.7*rad, scale(25));
        }
    }

        // Central Heading
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    mline_text(ctx, "Melbourne Connect's\nEcosystem", scale(CX), scale(CY), scale(45));
}


/*
    Draw the canvas based on button selections.
*/
function draw_canvas() {
    let canvas_style = getComputedStyle(document.querySelector('.float-right'));
    resize_canvas('canvasImage', parseFloat(canvas_style.width), window.innerHeight); //parseFloat(canvas_style.height)); 

    var can = document.getElementById('canvasImage')
    var ctx = can.getContext('2d');
    ctx.clearRect(0, 0, can.width, can.height);
    ctx.rect(0, 0, can.width, can.height);
    ctx.stroke();

    draw_members(ctx);
}

window.onresize = function() { draw_canvas(); } 


/*
    Function to split text across multi lines and draw on canvas

    @param ctx The Canvas context.
    @param str A string to write out
    @param x Position of centre of box on canvas
    @param y Position of TOP of box on canvas
    @param lineheight Number of pixels between lines.
*/
function mline_text(ctx, str, x, y, lineheight=15) {
    var words = str.split('\n');

    words.forEach(function(w) {
        ctx.fillText(w, x, y);
        y = y + lineheight;
    });
}

function draw_circle(ctx, x, y, rad, col) {
    ctx.beginPath();
    ctx.fillStyle = col;
    ctx.strokeStyle = col;
    ctx.arc(x, y, rad, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}
