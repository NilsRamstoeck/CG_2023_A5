uniform vec3 colorA;
varying float pos;

void main() {

    if(pos > 0.25 && pos < 0.75){
        discard;
    }

    gl_FragColor = vec4(colorA, 1.);
}