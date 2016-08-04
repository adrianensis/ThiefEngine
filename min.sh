#! /bin/bash

list="
geom/Vector4.js
geom/Vector3.js
geom/Vector2.js
geom/Matrix4.js
geom/GeometryUtil.js

graphic/Color.js
graphic/Texture.js
graphic/RenderContext.js
graphic/Shader.js
graphic/Material.js
graphic/Animation.js
graphic/AnimationFrame.js
graphic/Mesh.js
graphic/RectangleMesh.js
graphic/CubeMesh.js
graphic/SpriteBatch.js
graphic/RenderEngine.js
graphic/DebugRenderer.js

gameobject/BaseObject.js
gameobject/GameObject.js
gameobject/Component.js

physic/Custom/QuadTreeNode.js
physic/Custom/QuadTree.js
physic/Custom/PhysicsEngine.js
physic/Custom/State.js
physic/Custom/RigidBody.js
physic/Custom/Contact.js
physic/Custom/Collider.js
physic/Custom/Collider2D.js
physic/Custom/Polygon.js
physic/Custom/AABBCollider.js
physic/Custom/CircleCollider.js



gameobject/Scene.js
gameobject/Transform.js

graphic/MeshRenderer.js
graphic/LineRenderer.js
graphic/SpriteRenderer.js
graphic/Frustum.js
graphic/Camera.js
graphic/OrthoCamera.js
graphic/PerspectiveCamera.js

core/Time.js
core/Engine.js
core/Loader.js
core/Input.js
core/Log.js
core/Debug.js

script/Script.js
script/ScriptEngine.js

random/Random.js
random/PerlinNoise.js

builder/GameObjectBuilder.js
Thief/Thief.js
"

#list="core geom graphic physic gameobject script" #../test/test5.js"

rm "thief.min.js" 2> /dev/null

for i in $list
do
	cat "src/$i" >> "thief.min.js" 2> /dev/null
done
