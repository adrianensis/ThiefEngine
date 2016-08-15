#! /bin/bash

# THIS SCRIPT MINIMIZES THE JAVASCRIPT FILES INTO
# ONLY ONE .js FILE.

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

physics/QuadTreeNode.js
physics/QuadTree.js
physics/PhysicsEngine.js
physics/State.js
physics/RigidBody.js
physics/Contact.js
physics/Collider.js
physics/Collider2D.js
physics/Polygon.js
physics/AABBCollider.js
physics/CircleCollider.js



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
