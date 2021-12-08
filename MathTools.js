function RK(RS,q){
    var h = h_time;
    var k1 = RS(q)
    var k2 = RS(q.add(k1.multiply(h/2)))
    var k3 = RS(q.add(k2.multiply(h/2)))
    var k4 = RS(q.add(k3.multiply(h)))
    return q.add( k1.add(k2.multiply(2)).add(k3.multiply(2)).add(k4).multiply(h/6) );
}


function CreateRS(N,M,A,W){
    return function(q){   
        X = Vector.Zero(2*N);
        var n = 0;
        while (n < 2 * N) {
            X.elements[n] = q.elements[n+1]
            let tmpSum = 0;
            for(let i = 0; i < N; i++) tmpSum += Math.sin(q.elements[i*2] - q.elements[n] - A);
            tmpSum = tmpSum / N;
            X.elements[n+1] = 1/M *(W + tmpSum - q.elements[n + 1]);
            n+=2
        }
        return X
    }
}

function getState(X_last){
    var eps = 1e-5;
    var short_res = [];
    var res = "|";
    var values = [];
    for (i = 0;i < N;i++) values.push({"phase": X_last[2*i]%(2*Math.PI) ,"index":i+1,});
    values.sort((a,b)=>{  if (a["phase"] > b["phase"]) return 1; else return -1;});

    i = 1
    while (i<N){
        var chunk = []
        while( i < N && Math.abs(values[i]["phase"] - values[i - 1]["phase"] ) < eps ){
            chunk.push(`${values[i - 1]["index"]}`);
            i+=1
        }
        chunk.push(`${values[i-1]["index"]}`);
        short_res.push(""+chunk.length);
        chunk.sort((a,b)=>{ if (Number(a) > Number(b)) return 1; else return -1;});
        res+=chunk.join("=")+"|";
        i+=1
    }
    if (i==N){
        res+= `${values[i-1]["index"]}|`;
        short_res.push("1");
    }
    res = res + " ~ " + short_res.join(";");
    return res
}