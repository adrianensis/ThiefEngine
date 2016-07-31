var Thief = function() {

};

Thief.empty = function () {
  var obj = new GameObject();

  var transform = new Transform();
  obj.addComponent(transform);

  return obj;
};

/**
 * SPRITE
 */

/**
 * Sprite Builder
 */
Thief.sprite = function () {
  this.tmpObj = null;
  this.tmpSize = 0;
};

Thief.sprite.begin = function (textureName, pos, size, isStatic) {

  this.tmpObj = Thief.empty();
  this.tmpSize = size;

  var renderer = new SpriteRenderer();

  var material = new Material();

  this.tmpObj.addComponent(renderer);

  var transform = this.tmpObj.getComponent(Transform);

  transform.translate(pos);
  transform.setScale(new Vector2(size,size));

  material.setTexture(Loader.loadTexture(textureName));

  renderer.setMaterial(material);

  return this;
};


/**
 * horizontalDir: -1 -> left, 1 -> right, 0 -> not move
 * verticalDir: -1 -> down, 1 -> up, 0 -> not move
 */
Thief.sprite.addAnimation = function (name, frameCount, horizontalDir, verticalDir, startPosition, speed) {

  // TODO: check if coordinates are > 1 or < 0 !!!!!

  var animation = new Animation();
  animation.setSpeed(speed);

  var size = 1/frameCount;

  for (var i = 0; i < frameCount; i++) {

    var pos = new Vector2(0,0);
    pos.add(startPosition);

    if(horizontalDir !== 0){
      pos.x += i*size;
      pos.x *= horizontalDir;
    }

    if(verticalDir !== 0){
      pos.y += i*size;
      pos.y *= verticalDir;
    }

    var frame = new AnimationFrame();
    frame.set(pos,size,size);
    animation.addFrame(frame);

  }

  this.tmpObj.getComponent(SpriteRenderer).addAnimation(name,animation);

  return this;
};

Thief.sprite.setAnimation = function (name) {

  this.tmpObj.getComponent(SpriteRenderer).setAnimation(name);
  return this;
};

Thief.sprite.setStatic = function (isStatic) {

  this.tmpObj.setStatic(isStatic);
  return this;
};

Thief.sprite.setAlphaColor = function (color) {

  this.tmpObj.getComponent(SpriteRenderer).setAlphaColor(color);
  return this;
};

Thief.sprite.setCollider = function (colliderClass) {

  var rigidBody = new RigidBody();
  var collider = null;

  if(colliderClass === AABBCollider)
    collider = new AABBCollider(this.tmpSize,this.tmpSize);
  else if(colliderClass === CircleCollider)
    collider = new CircleCollider(this.tmpSize/2);

  this.tmpObj.addComponent(rigidBody);
  this.tmpObj.addComponent(collider);

  return this;
};

Thief.sprite.addScript = function (script) {

  this.tmpObj.addComponent(script);

  return this;
};

Thief.sprite.end = function () {
  return this.tmpObj;
};
