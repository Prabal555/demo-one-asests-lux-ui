import React, { Component } from 'react';
import * as THREE from 'three';
import getOrbitControls from 'three-orbit-controls';

const OrbitControls = getOrbitControls(THREE);

class Canvas extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div ref={ref => this.mount = ref} />;
    }
    componentDidMount() {
        var threeD_container, threeD_scene, threeD_camera, threeD_renderer, threeD_controls, threeD_raycaster;
        var cursorPosition = new THREE.Vector2(), intersectedMesh;
        var earthSphereMesh;
        //Begin function for 3d Demo
        const Init3DPage = () => {

            // Initialize 3d Scene
            threeD_scene = new THREE.Scene();
            // const { OrbitControls } = THREEOrbit;
            // Initialize 3d Renderer and append in container
            threeD_container = document.getElementById('ThreeJSCanvasContainer');
            threeD_renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
            threeD_renderer.setSize(window.innerWidth, window.innerHeight);
            threeD_renderer.shadowMap.enabled = true;
            threeD_renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.mount.appendChild(threeD_renderer.domElement);

            // Initialize 3d Camera
            threeD_camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
            threeD_camera.position.set(-26, 32, -0.5);

            // 3D Controls
            threeD_controls = new OrbitControls(threeD_camera, threeD_renderer.domElement);

            // 3D Lights
            var threeD_light3 = new THREE.AmbientLight(0xffffff);
            threeD_scene.add(threeD_light3);

            //Add base geometry for scene
            var sceneBaseGeometry = new THREE.PlaneGeometry(50, 50, 32);
            var sceneBasematerial = new THREE.MeshPhongMaterial({color: 0xbebebe, side: THREE.DoubleSide});
            var sceneBasePlaneMesh = new THREE.Mesh(sceneBaseGeometry, sceneBasematerial);
            threeD_scene.add(sceneBasePlaneMesh);
            sceneBasePlaneMesh.rotation.x = -1.57;
            sceneBasePlaneMesh.position.y = -0.02;
            var gridHelper = new THREE.GridHelper(50, 50);
            threeD_scene.add(gridHelper);

            add3dmodel();

            var geometry = new THREE.SphereGeometry(0.2, 32, 32);
            var material = new THREE.MeshBasicMaterial({color: 0xffff00});
            var spherePt1 = new THREE.Mesh(geometry, material);
            var spherePt2 = new THREE.Mesh(geometry, material);
            var spherePt3 = new THREE.Mesh(geometry, material);
            var spherePt4 = new THREE.Mesh(geometry, material);
            //threeD_scene.add(spherePt1);
            //threeD_scene.add(spherePt2);
            //threeD_scene.add(spherePt3);
            //threeD_scene.add(spherePt4);

            //spherePt1.position.x = 1;
            //spherePt1.position.y = 12;
            ///spherePt1.position.z = 1;

            //spherePt2.position.x = 1;
            //spherePt2.position.y = 12;
            //spherePt2.position.z = 9;

            //spherePt3.position.x = 9;
            //spherePt3.position.y = 12;
            //spherePt3.position.z = 9;

            // spherePt4.position.x = 9;
            // spherePt4.position.y = 12;
            //spherePt4.position.z = 1;


        }
        function add3dmodel() {
            var centerCylinderGeometry = new THREE.CylinderBufferGeometry(1, 1, 13, 32);
            var centerCylinderMaterial = new THREE.MeshStandardMaterial({color: 0xc0c0c0, emissive: 0x000000});

            var centrerCylinderMesh = new THREE.Mesh(centerCylinderGeometry, centerCylinderMaterial);
            threeD_scene.add(centrerCylinderMesh);
            centrerCylinderMesh.position.set(5, 6, 5);

            //Add 4 frmaes for tower geometry
            var towerLineLength = 12.16;
            addLineCylinder(towerLineLength, 0.5, towerLineLength / 2, 0.5, Math.PI / 36, 0, -Math.PI / 36);
            addLineCylinder(towerLineLength, 9.5, towerLineLength / 2, 0.5, Math.PI / 36, 0, Math.PI / 36);
            addLineCylinder(towerLineLength, 9.5, towerLineLength / 2, 9.5, -Math.PI / 36, 0, Math.PI / 36);
            addLineCylinder(towerLineLength, 0.5, towerLineLength / 2, 9.5, -Math.PI / 36, 0, -Math.PI / 36);

            var frame1LineLength = 11.66;
            addLineCylinder(frame1LineLength, 0.3, (frame1LineLength / 2) + 3 - 5.4, 4.7, Math.PI / 3.3, 0, -Math.PI / 60);
            addLineCylinder(frame1LineLength, 0.3, (frame1LineLength / 2) + 3 - 5.3, 5.3, -Math.PI / 3.3, 0, -Math.PI / 60);

            addLineCylinder(frame1LineLength, 9.7, (frame1LineLength / 2) + 3 - 5.4, 4.7, Math.PI / 3.3, 0, Math.PI / 60);
            addLineCylinder(frame1LineLength, 9.7, (frame1LineLength / 2) + 3 - 5.3, 5.3, -Math.PI / 3.3, 0, Math.PI / 60);

            addLineCylinder(frame1LineLength, 5.3, (frame1LineLength / 2) + 3 - 5.4, 0.3, Math.PI / 60, 0, Math.PI / 3.3);
            addLineCylinder(frame1LineLength, 4.7, (frame1LineLength / 2) + 3 - 5.3, 0.3, Math.PI / 60, 0, -Math.PI / 3.3);

            addLineCylinder(frame1LineLength, 5.3, (frame1LineLength / 2) + 3 - 5.4, 9.8, -2 * Math.PI / 60, 0, Math.PI / 3.3);
            addLineCylinder(frame1LineLength, 4.7, (frame1LineLength / 2) + 3 - 5.3, 9.8, -2 * Math.PI / 60, 0, -Math.PI / 3.3);


            var frame2LineLength = 10.05;
            addLineCylinder(frame2LineLength, 0.85, (frame2LineLength / 2) + 9 - 4.6, 4.8, Math.PI / 3.1, 0, -Math.PI / 65);
            addLineCylinder(frame2LineLength, 0.85, (frame2LineLength / 2) + 9 - 4.5, 5.2, -Math.PI / 3.1, 0, -Math.PI / 65);

            addLineCylinder(frame2LineLength, 9.15, (frame2LineLength / 2) + 9 - 4.6, 4.8, Math.PI / 3.1, 0, Math.PI / 60);
            addLineCylinder(frame2LineLength, 9.15, (frame2LineLength / 2) + 9 - 4.5, 5.2, -Math.PI / 3.1, 0, Math.PI / 65);

            addLineCylinder(frame2LineLength, 5.2, (frame2LineLength / 2) + 9 - 4.6, 0.8, 2 * Math.PI / 60, 0, Math.PI / 3.1);
            addLineCylinder(frame2LineLength, 4.8, (frame2LineLength / 2) + 9 - 4.5, 0.8, 2 * Math.PI / 60, 0, -Math.PI / 3.1);

            addLineCylinder(frame2LineLength, 5.2, (frame2LineLength / 2) + 9 - 4.6, 9.25, -2 * Math.PI / 60, 0, Math.PI / 3.1);
            addLineCylinder(frame2LineLength, 4.8, (frame2LineLength / 2) + 9 - 4.5, 9.25, -2 * Math.PI / 60, 0, -Math.PI / 3.1);


            var horizontal1LineLength = 9;
            addLineCylinder(horizontal1LineLength, 0.6, (horizontal1LineLength / 2) + 2.3, 5, Math.PI / 2, Math.PI / 2, 0);
            addLineCylinder(horizontal1LineLength, 9.4, (horizontal1LineLength / 2) + 2.3, 5, Math.PI / 2, Math.PI / 2, 0);

            addLineCylinder(horizontal1LineLength, 5, (horizontal1LineLength / 2) + 2.3, 0.5, 0, 0, Math.PI / 2);
            addLineCylinder(horizontal1LineLength, 5, (horizontal1LineLength / 2) + 2.3, 9.4, 0, 0, Math.PI / 2);

            var horizontal2LineLength = 8;
            addLineCylinder(horizontal2LineLength, 1, (horizontal2LineLength / 2) + 8, 5, Math.PI / 2, Math.PI / 2, 0);
            addLineCylinder(horizontal2LineLength, 9, (horizontal2LineLength / 2) + 8, 5, Math.PI / 2, Math.PI / 2, 0);

            addLineCylinder(horizontal2LineLength, 5, (horizontal2LineLength / 2) + 8, 0.9, 0, 0, Math.PI / 2);
            addLineCylinder(horizontal2LineLength, 5, (horizontal2LineLength / 2) + 8, 9, 0, 0, Math.PI / 2);


            //Code for flare connecting members
            var flareConnectingLineLength = 11.4;
            var flareLine1 = addLineCylinder(flareConnectingLineLength, 5, (flareConnectingLineLength / 2) + 6.3, 5, 0, -Math.PI / 4, Math.PI / 2);
            var flareLine2 = addLineCylinder(flareConnectingLineLength, 5, (flareConnectingLineLength / 2) + 6.3, 5, 0, Math.PI / 4, Math.PI / 2);

            flareLine1.material.color.setHex(0x000000);
            flareLine2.material.color.setHex(0x000000);
        }

        function addLineCylinder(length, posX, posY, posZ, rotationX, rotationY, rotationZ) {

            var towerLineCylinderGeometry = new THREE.CylinderBufferGeometry(0.1, 0.15, length, 32);


            var vertices = towerLineCylinderGeometry.attributes.position;

            // change upper vertices
            var v3 = new THREE.Vector3(); // temp vector
            for (let i = 0; i < vertices.count; i++) {
                //     v3.fromBufferAttribute(vertices, i); // set the temp vector
                //   v3.y = v3.y > 0 ? (v3.x * 0.5) + 2.5 : v3.y ; // change position by condition and equation
                // vertices.setY(i, v3.y); // set Y-component of a vertex
            }

            //var towerLineCylinderMaterial = new THREE.MeshPhongMaterial({color: 0xb9b923, emissive: 0x000000});
            var towerLineCylinderMaterial = new THREE.MeshPhongMaterial({

                color: 0x9b870c,
                specular: 0x050505,
                shininess: 100
            });
            const towerLineCylinderMesh = new THREE.Mesh(towerLineCylinderGeometry, towerLineCylinderMaterial);
            threeD_scene.add(towerLineCylinderMesh);

            towerLineCylinderMesh.position.x = posX;
            towerLineCylinderMesh.position.y = posY;
            towerLineCylinderMesh.position.z = posZ;
            towerLineCylinderMesh.rotation.set(rotationX, rotationY, rotationZ);

            return towerLineCylinderMesh;
        }

        function cylinderMesh(pointX, pointY)
        {
            // edge from X to Y
            var direction = new THREE.Vector3().subVectors(pointY, pointX);
            var arrow = new THREE.ArrowHelper(direction, pointX);

            // cylinder: radiusAtTop, radiusAtBottom, 
            //     height, radiusSegments, heightSegments
            var edgeGeometry = new THREE.CylinderGeometry(0.2, 0.2, direction.length(), 6, 4);

            var edge = new THREE.Mesh(edgeGeometry,
                    new THREE.MeshBasicMaterial({color: 0x0000ff}));
            edge.rotation = arrow.rotation.clone();
            edge.position = new THREE.Vector3().addVectors(pointX, direction.multiplyScalar(0.5));
            return edge;
        }
        //Function to request render for 3D scene animations
        function animate3DPage() {
            requestAnimationFrame(animate3DPage);
            threeD_controls.update();
            render3DPage();
        }

        //Function to perform 3D scene animations
        function render3DPage() {
            threeD_renderer.render(threeD_scene, threeD_camera);
        }

        Init3DPage();
        animate3DPage();
    }
}

export default Canvas;