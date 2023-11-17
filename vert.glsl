varying float pos;

void main() {
    vec4 modelViewPosition = modelViewMatrix
        * vec4(position, 1.0);
    gl_Position = projectionMatrix
        * modelViewPosition;

    pos = position.x + 0.5;
}