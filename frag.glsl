uniform vec3 colorA;
uniform vec3 colorB;
varying float pos;

void main() {

    if(pos > 0.25 && pos < 0.75){
        gl_FragColor = vec4(colorB, 1.);
    } else {
        gl_FragColor = vec4(colorA, 1.);
    }
}