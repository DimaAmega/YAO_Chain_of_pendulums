function pretubrations(N_of_element, forse){
    q.elements[2*N_of_element-1]+=forse;
}
function updateAlpha(newK){
    A = newK;
    RS = CreateRS(N,M,A,W);
}

function updateOmega(newL){
    W = newL;
    RS = CreateRS(N,M,A,W);
}
function updateM(newG){
    M = newG;
    RS = CreateRS(N,M,A,W);
}
function addElems(number) {
    for (let i = 0; i < number; i++) {
        q.elements.push(0,0);
        chart.addTrack(q,N);
        N++;
    }
    RS = CreateRS(N,M,A,W);
    width_px = Canvas.offsetWidth/N;
}
function removeElems(number) {
    for (let i = 0; i < number; i++) { 
        q.elements.pop(); 
        q.elements.pop();
        chart.removeTrack(); 
        N--;
    }
    RS = CreateRS(N,M,A,W)
    width_px = Canvas.offsetWidth/N;
}
function updateXSpeed(new_x_speed){
    x_speed = new_x_speed;
}