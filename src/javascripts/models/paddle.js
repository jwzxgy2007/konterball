import {MeshBasicMaterial, DoubleSide, Object3D} from 'three';

export default (objLoader, config, parent) => new Promise(resolve => {
  objLoader.load('paddle.obj', object => {
    const scale = 0.024;
    var paddle_mesh = new Object3D();
    var obj_len = object.children.length
    for (let i = 0; i < obj_len; i++) {
      // object.children[0].scale.set(scale, scale, scale);
      // object.children[0].position.set(0, -1, 0.5);
      // object.children[0].rotation.set(-0.78,0,0);
      paddle_mesh.add(object.children[0])
    }

    
    paddle_mesh.scale.set(scale, scale, scale);
    // paddle_mesh.position.set(0, -1, 0.5);
    // paddle_mesh.rotation.set(-0.78,0,0);
    
    const redMaterial = new MeshBasicMaterial({
      color: config.colors.PADDLE_COLOR,
      side: DoubleSide,
    });
    const redSideMaterial = new MeshBasicMaterial({
      color: config.colors.PADDLE_SIDE_COLOR,
      side: DoubleSide,
    });
    const woodMaterial = new MeshBasicMaterial({
      color: config.colors.PADDLE_WOOD_COLOR,
      side: DoubleSide,
    });
    const woodSideMaterial = new MeshBasicMaterial({
      color: config.colors.PADDLE_WOOD_SIDE_COLOR,
      side: DoubleSide,
    });
    paddle_mesh.traverse((child) => {
      if (child.isMesh) {
        if (child.name === 'Extrude') {
          child.material = redSideMaterial;
        } else if (child.name === 'Cap_1' || child.name === 'Cap_2') {
          child.material = redMaterial;
        } else if (child.name === 'Extrude.1') {
          child.material = woodSideMaterial;
        } else {
          child.material = woodMaterial;
        }
      }
      child.castShadow = true;
    });
    const paddle = paddle_mesh.clone();
    paddle.name = 'paddle';
    paddle.visible = true;
    paddle.castShadow = true;
    // parent.add(paddle);


    const paddleOpponent = paddle_mesh.clone();
    paddleOpponent.name = 'paddleOpponent';
    paddleOpponent.position.z = config.tablePositionZ - config.tableDepth / 2;
    paddleOpponent.position.y = 1;
    paddleOpponent.visible = false;
    parent.add(paddleOpponent);
    resolve({paddle, paddleOpponent});
  });
});
