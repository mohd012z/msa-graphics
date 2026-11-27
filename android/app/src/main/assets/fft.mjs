// Independent radix-2 FFT; inverse includes normalization.
export function fft(real, imag, inverse=false) {
 const n=real.length;
 if(n!==imag.length || n<1 || n>65536 || (n&(n-1))) throw Error('Invalid FFT size');
 for(let i=0;i<n;i++) if(!Number.isFinite(real[i])||!Number.isFinite(imag[i])) throw Error('Nonfinite input');
 for(let i=1,j=0;i<n;i++){let bit=n>>1;for(;j&bit;bit>>=1)j^=bit;j^=bit;if(i<j){[real[i],real[j]]=[real[j],real[i]];[imag[i],imag[j]]=[imag[j],imag[i]];}}
 for(let len=2;len<=n;len*=2) for(let i=0;i<n;i+=len) for(let j=0;j<len/2;j++){const a=(inverse?2:-2)*Math.PI*j/len,c=Math.cos(a),s=Math.sin(a),p=i+j,q=p+len/2,r=real[q]*c-imag[q]*s,m=real[q]*s+imag[q]*c;real[q]=real[p]-r;imag[q]=imag[p]-m;real[p]+=r;imag[p]+=m;}
 if(inverse)for(let i=0;i<n;i++){real[i]/=n;imag[i]/=n;} return {real,imag};
}
