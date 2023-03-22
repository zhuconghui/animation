
/* draw_envt prend en argument une liste de liste, chaque liste de la liste est un segment représenté sous la 
 * la forme [x1,x2,y1,y2] la fonction dessine les segments de la liste en 2D
 */


function draw_envt(walls) {
    for (const sgmt of walls) {

        const options = {
            points: [new BABYLON.Vector3(sgmt[0], sgmt[2], 0), new BABYLON.Vector3(sgmt[1], sgmt[3], 0)],
            updatable: true,
        }

        BABYLON.MeshBuilder.CreateLines("lines", options, scene);
    }
}


/************************** la fonction extrude prend en argument une liste de liste, chaque liste de la liste est un segment
 * représenté sous la forme [x1,x2,y1,y2] la fonction extrude les segments celon l'axe z
 * ************************************************ */

function extrude(walls) {

    for (const sgmt of walls) {
        const options = {
            shape: [new BABYLON.Vector3(sgmt[0], sgmt[2], 0), new BABYLON.Vector3(sgmt[1], sgmt[3], 0)], //la forme à extruder
            path: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 10)], //l'axe à suivre
            sideOrientation: BABYLON.Mesh.DOUBLESIDE, //pour afficher les 2 côtés
            updatable: true, //pour pouvoir faire évoluer le mesh
        }

        let ext = BABYLON.MeshBuilder.ExtrudeShape("ext", options, scene);
    }
}

function draw_stand(stands) {
    for (const stand of stands) {
        const optionsTable = {
            height: 0.2,
            width: 1,
            depth: 1,
            updatable: true,
        }

        const optionsCylinder = {
            height: 1,
            diameter: 0.2,
            updatable: true,
        }

        var table = BABYLON.MeshBuilder.CreateBox("table", optionsTable, scene);
        table.position.x = 0.5 * (stand[0] + stand[1]);
        table.position.z = 0.5 * (stand[2] + stand[3]);
        table.position.y = 1;
        table.material = new BABYLON.StandardMaterial("wood", scene);
        table.material.diffuseTexture = new BABYLON.Texture("https://i.imgur.com/0ezlRYU.jpeg", scene);

        var cylinder1 = BABYLON.MeshBuilder.CreateCylinder("cylinder1", optionsCylinder, scene);
        cylinder1.position.x = stand[0];
        cylinder1.position.z = stand[2];
        cylinder1.position.y = 0.5;

        var cylinder2 = BABYLON.MeshBuilder.CreateCylinder("cylinder2", optionsCylinder, scene);
        cylinder2.position.x = stand[0];
        cylinder2.position.z = stand[3];
        cylinder2.position.y = 0.5;

        var cylinder3 = BABYLON.MeshBuilder.CreateCylinder("cylinder3", optionsCylinder, scene);
        cylinder3.position.x = stand[1];
        cylinder3.position.z = stand[2];
        cylinder3.position.y = 0.5;

        var cylinder4 = BABYLON.MeshBuilder.CreateCylinder("cylinder4", optionsCylinder, scene);
        cylinder4.position.x = stand[1];
        cylinder4.position.z = stand[3];
        cylinder4.position.y = 0.5;
    }

}

function draw_sphere(spheres, diametre) {
    for (const sphere of spheres) {

        const options = {
            diameter: diametre,
            updatable: true,
        }
        var person = BABYLON.MeshBuilder.CreateSphere("circle", options, scene);

        person.position.x = sphere[0];
        person.position.y = diametre / 2;
        person.position.z = sphere[1];
        // person.rotation = new BABYLON.Vector3(- Math.PI / 2, 0, 0);

        var material = new BABYLON.StandardMaterial("sphereMaterial", scene);
        material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Red color
        person.material = material;

        person.renderingGroupId = 0;
        // scene.removeMesh(person);
    }

}

function draw_sphere_json(tab, diametre) {
    var i=0;
    for(const spheres of tab){

        for (const sphere of spheres) {

            const options = {
                diameter: diametre,
                updatable: true,
            }
            var person = BABYLON.MeshBuilder.CreateSphere("circle", options, scene);
    
            person.position.x = sphere[0];
            person.position.y = diametre / 2;
            person.position.z = sphere[1];
            // person.rotation = new BABYLON.Vector3(- Math.PI / 2, 0, 0);
    
            var material = new BABYLON.StandardMaterial("sphereMaterial", scene);
            material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Red color
            person.material = material;
    
            person.renderingGroupId = 0;
    
        }
        sleep(1000);
    }
    
}

function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
  }
/*
    cette fonction lit la paquet JSON dans un tableau (une matrice)
    chaque ligne comprend les positions des agents a l'instant donné
    nb de ligne = nb_step
    nb de colonne = nb_people
*/
function transformJSON(paquetJSON) {

    var tab = [];
    var i, j = 0;

    // console.log(paquetJSON.nb_people);
    // console.log(paquetJSON.nb_step);
    // console.log(paquetJSON.timeline[1][0][0]);

    for (i = 0; i < paquetJSON.nb_step; i++) {
        tab[i] = [];
        for(j = 0; j<paquetJSON.nb_people;j++){
            tab[i][j] = paquetJSON.timeline[i][j];
            // console.log(tab[i][j]);
        }
    }

    return tab;

}