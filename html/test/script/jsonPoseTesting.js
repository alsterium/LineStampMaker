//protoType

array = [
    [7.54516134791414, -21.768140173180647, -183.4596745057812],
    [-124.5336455982307, 2.415918621530429, -284.8569690566266],
    [-193.02280218024345, -134.14277584172567, -702.8368725045019],
    [-119.88440248193754, 9.72410772056005, -970.9002981473045],
    [154.8486118073826, -45.952199328402315, -334.57519674023166],
    [215.08971510235713, -174.52465049814086, -714.29186443519],
    [166.46238247650444, -23.654825428960223, -983.4563352068009],
    [3.4347934233028363, 63.754926563186196, 133.4556896348461],
    [4.0444335372624645, 92.51847278387943, 380.5741280391957],
    [-23.95490498313763, -6.959973842296878, 587.2537513546404],
    [-59.80226250940439, 52.05215416663249, 664.2835118003845],
    [195.78954304127942, 82.72433860524372, 345.4867843416409],
    [436.04629683883314, 101.85369806885731, 157.6088322373995],
    [467.13680014680523, -35.958118637279526, -188.32700894361506],
    [-182.2795224752419, 127.74897641993233, 369.8786700504398],
    [-398.79876732551367, 27.03427199859532, 338.61811621791105],
    [-514.5184003971674, -116.86618120857737, 524.1660520795907]
  ];

  function swap(a, x, y) {
    a[x] = [a[y], (a[y] = a[x])][0];
    return a;
  }

  //配列の要素をx,z,yからx,y,zに入れ替え
  for (i = 0; i < array.length; i++) swap(array[i], 1, 2);
  //左手系を右手系に変換
  for(i = 0;i<array.length;i++)array[i][0] *= -1;


  function Calcquaternion(array){
  	var up = new THREE.Vector3(0, 1, 0);

  	var normalAxis = new THREE.Vector3(array[0], array[1], array[2]).normalize();

  	var dir = new THREE.Vector3();

  	dir.crossVectors(up, normalAxis).normalize();

  	console.log(dir);

  	var dot = up.dot(normalAxis);

  	var rad = Math.acos(dot);

  	var q = new THREE.Quaternion();

  	q.setFromAxisAngle(dir, rad);

    console.log(q);

  	return q;
  }

  var quater = new Array();
  quater = new THREE.Quaternion();
  for(i = 0; i < array.length; i++){
  	quater[i] = Calcquaternion(array[i]);
    console.log(quater[i]);
  }

  console.log(quater[0].x);

  function createJsonPose(array){
    let jsonPose={
       /* "hips":{
            //"position":[quater[0].x, quater[0].y, quater[0].z],
            "rotation":[quater[0].x, quater[0].y, quater[0].z, quater[0].w]
        },
        "rightUpperLeg":{
            //"position":[quater[1].x, quater[1].y, quater[1].z],
            "rotation":[quater[1].x, quater[1].y, quater[1].z, quater[1].w]
        },
        "rightLowerLeg":{
            "position":[quater[2].x, quater[2].y, quater[2].z],
            "rotation":[quater[2].w]
        },
        "rightFoot":{
            "position":[quater[3].x, quater[3].y, quater[3].z],
            "rotation":[quater[3].w]
        },
        "leftUpperLeg":{
            "position":[quater[4].x, quater[4].y, quater[4].z],
            "rotation":[quater[4].w]
        },
        "leftLowerLeg":{
            "position":[quater[5].x, quater[5].y, quater[5].z],
            "rotation":[quater[5].w]
        },
        "leftFoot":{
            "position":[quater[6].x, quater[6].y, quater[6].z],
            "rotation":[quater[6].w]
        },
        "spine":{
            "position":[quater[7].x, quater[7].y, quater[7].z],
            "rotation":[quater[7].w]
        },
        "chest":{
            "position":[quater[8].x, quater[8].y, quater[8].z],
            "rotation":[quater[8].w]
        },
        "neck":{
            "position":[quater[9].x, quater[9].y, quater[9].z],
            "rotation":[quater[9].w]
        },
        "head":{
            "position":[quater[10].x, quater[10].y, quater[10].z],
            "rotation":[quater[10].w]
        },
        "leftUpperArm":{
            "position":[quater[11].x, quater[11].y, quater[11].z],
            "rotation":[quater[11].w]
        },
        "leftLowerArm":{
            "position":[quater[12].x, quater[12].y, quater[12].z],
            "rotation":[quater[12].w]
        },
        "leftHand":{
            "position":[quater[13].x, quater[13].y, quater[13].z],
            "rotation":[quater[13].w]
        },
        "rightUpperArm":{
            "position":[quater[14].x, quater[14].y, quater[14].z],
            "rotation":[quater[14].w]
        },
        "rightLowerArm":{
            "position":[quater[15].x, quater[15].y, quater[15].z],
            "rotation":[quater[15].w]
        },
        "rightHand":{
            "position":[quater[16].x, quater[16].y, quater[16].z],
            "rotation":[quater[16].w]
        },*/

         "hips":{
            //"position":[quater[0].x, quater[0].y, quater[0].z],
            "rotation":[quater[0].x, quater[0].y, quater[0].z, quater[0].w]
        },
        "rightUpperLeg":{
            //"position":[quater[1].x, quater[1].y, quater[1].z],
            "rotation":[quater[1].x, quater[1].y, quater[1].z, quater[1].w]
        },
        "rightLowerLeg":{
            //"position":[quater[2].x, quater[2].y, quater[2].z],
            "rotation":[quater[2].x, quater[2].y, quater[2].z, quater[2].w]
        },
        "rightFoot":{
            //"position":[quater[3].x, quater[3].y, quater[3].z],
            "rotation":[quater[3].x, quater[3].y, quater[3].z, quater[3].w]
        },
        "leftUpperLeg":{
            //"position":[quater[4].x, quater[4].y, quater[4].z],
            "rotation":[quater[4].x, quater[4].y, quater[4].z, quater[4].w]
        },
        "leftLowerLeg":{
            //"position":[quater[5].x, quater[5].y, quater[5].z],
            "rotation":[quater[5].x, quater[5].y, quater[5].z, quater[5].w]
        },
        "leftFoot":{
            //"position":[quater[6].x, quater[6].y, quater[6].z],
            "rotation":[quater[6].x, quater[6].y, quater[6].z, quater[6].w]
        },
        "spine":{
            //"position":[quater[7].x, quater[7].y, quater[7].z],
            "rotation":[quater[7].x, quater[7].y, quater[7].z, quater[7].w]
        },
        "chest":{
            //"position":[quater[8].x, quater[8].y, quater[8].z],
            "rotation":[quater[8].x, quater[8].y, quater[8].z, quater[8].w]
        },
        "neck":{
            //"position":[quater[9].x, quater[9].y, quater[9].z],
            "rotation":[quater[9].x, quater[9].y, quater[9].z, quater[9].w]
        },
        "head":{
            //"position":[quater[10].x, quater[10].y, quater[10].z],
            "rotation":[quater[10].x, quater[10].y, quater[10].z, quater[10].w]
        },
        "leftUpperArm":{
            //"position":[quater[11].x, quater[11].y, quater[11].z],
            "rotation":[quater[11].x, quater[11].y, quater[11].z, quater[11].w]
        },
        "leftLowerArm":{
            //"position":[quater[12].x, quater[12].y, quater[12].z],
            "rotation":[quater[12].x, quater[12].y, quater[12].z, quater[12].w]
        },
        "leftHand":{
            //"position":[quater[13].x, quater[13].y, quater[13].z],
            "rotation":[quater[13].x, quater[13].y, quater[13].z, quater[13].w]
        },
        "rightUpperArm":{
            //"position":[quater[14].x, quater[14].y, quater[14].z],
            "rotation":[quater[14].x, quater[14].y, quater[14].z, quater[14].w]
        },
        "rightLowerArm":{
            //"position":[quater[15].x, quater[15].y, quater[15].z],
            "rotation":[quater[15].x, quater[15].y, quater[15].z, quater[15].w]
        },
        "rightHand":{
            //"position":[quater[16].x, quater[16].y, quater[16].z],
            "rotation":[quater[16].x, quater[16].y, quater[16].z, quater[16].w]
        },
      }
    /*jsonPose.hips.position = array[0];
    jsonPose.rightUpperLeg.position = array[1];
    jsonPose.rightLowerLeg.position = array[2];
    jsonPose.rightFoot.position = array[3];
    jsonPose.leftUpperLeg.position = array[4];
    jsonPose.leftLowerLeg.position = array[5];
    jsonPose.leftFoot.position = array[6];
    jsonPose.spine.position = array[7];
    jsonPose.chest.position = array[8];
    jsonPose.neck.position = array[9];
    jsonPose.head.position = array[10];
    jsonPose.leftUpperArm.position = array[11];
    jsonPose.leftLowerArm.position = array[12];
    jsonPose.leftHand.position = array[13];
    jsonPose.rightUpperArm.position = array[14];
    jsonPose.rightLowerArm.position = array[15];
    jsonPose.rightHand.position = array[16];*/

    return jsonPose;
  }

  var PoseData = createJsonPose(array);

  console.log(PoseData);

window.onload = ()=>{
    //create renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#myCanvas")
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      //create scene
      const scene = new THREE.Scene();

      //create cam
      const camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        0.1,
        20.0
      );

      //camera controls
      const controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.screenSpacePanning = true;
      controls.target.set(0.0, 1.0, 0.0);
      controls.update();

      //light
      const light = new THREE.DirectionalLight(0xffffff);
      light.position.set(1.0, 1.0, 1.0).normalize();
      scene.add(light);

        let currentVrm = undefined;
        const loader = new THREE.GLTFLoader();
        loader.crossOrigin = "anonymous";
        loader.load(
            "assetts/AliciaSolid.vrm",
            gltf => {
              THREE.VRM.from(gltf).then(vrm => {
                scene.add(vrm.scene);
                currentVrm = vrm;

                const head = vrm.humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Head );
                camera.position.set( 0.0, head.getWorldPosition(new THREE.Vector3()).y, 2.0 );

                THREE.VRM.from(gltf).then((vrm)=>{
                    vrm.humanoid.setPose(PoseData);
                })

                console.log(vrm);
              });
            },
            progress =>
              console.log(
                "Loading moddel...",
                100 * (progress.loaded / progress.total),
                "%"
              ),
            error => console.error(error)
        );
        //helpers
        const gridHelper = new THREE.GridHelper(10, 10);
        scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        renderer.render(scene, camera);

        tick();
        // 毎フレーム時に実行されるループイベントです
        function tick() {
          renderer.render(scene, camera); // レンダリング
          requestAnimationFrame(tick);
        }
}