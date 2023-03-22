class Sphere {
    constructor(currentPosition, scene) {
        this.timeLineIndex = 1;
        this.mesh = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.5 }, scene)
        this.mesh.position.x = currentPosition[0];
        this.mesh.position.y = 0.25;
        this.mesh.position.z = currentPosition[1];

        var materialSphere = new BABYLON.StandardMaterial("texture1", scene);
        materialSphere.diffuseColor = new BABYLON.Color3(1, 0, 0);
        this.mesh.material = materialSphere;
    }

    updatePosition(nextPosition) {
        let startPosition = new BABYLON.Vector3(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
        let endPosition = new BABYLON.Vector3(nextPosition[0], 0.25, nextPosition[1]);
        BABYLON.Animation.CreateAndStartAnimation("anim", this.mesh, "position", 15, 10, startPosition, endPosition, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        this.timeLineIndex++;
    }
}