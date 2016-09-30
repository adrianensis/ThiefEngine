#! /bin/bash

# THIS SCRIPT JOIN THE JAVASCRIPT FILES INTO
# ONLY ONE .js FILE.

# physics/Custom/QuadTreeNode.js
# physics/Custom/QuadTree.js
# physics/Custom/PhysicsEngine.js
# physics/Custom/State.js
# physics/Custom/RigidBody.js
# physics/Custom/ContactManager.js
# physics/Custom/Contact.js
# physics/Custom/Collider.js
# physics/Custom/Collider2D.js
# physics/Custom/Polygon.js
# physics/Custom/AABBCollider.js
# physics/Custom/CircleCollider.js

list="
geom/Vector4.js
geom/Vector3.js
geom/Vector2.js
geom/Matrix4.js
geom/GeometryUtil.js

graphics/Color.js
graphics/Texture.js
graphics/RenderContext.js
graphics/Shader.js
graphics/Material.js
graphics/Animation.js
graphics/AnimationFrame.js
graphics/Mesh.js
graphics/RectangleMesh.js
graphics/CubeMesh.js
graphics/SpriteBatch.js
graphics/RenderEngine.js
graphics/DebugRenderer.js

gameobject/BaseObject.js
gameobject/GameObject.js
gameobject/Component.js

physics/Box2DWeb/Box2d.min.js
physics/Box2DWeb/PhysicsEngine.js
physics/Box2DWeb/RigidBody.js
physics/Box2DWeb/Collider.js
physics/Box2DWeb/AABBCollider.js
physics/Box2DWeb/CircleCollider.js



gameobject/Scene.js
gameobject/Transform.js

graphics/MeshRenderer.js
graphics/LineRenderer.js
graphics/SpriteRenderer.js
graphics/Frustum.js
graphics/Camera.js
graphics/OrthoCamera.js
graphics/PerspectiveCamera.js

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
builder/SpriteBuilder.js
builder/CameraBuilder.js
Thief/Thief.js
"

#list="core geom graphics physics gameobject script" #../test/test5.js"

rm "thief.min.js" 2> /dev/null

for i in $list
do
	cat "src/$i" >> "thief.min.js" 2> /dev/null
done
