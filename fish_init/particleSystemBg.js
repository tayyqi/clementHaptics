// this class describes the properties of a single particle.
class Particle {
    // setting the co-ordinates, radius and the
    // speed of a particle in both the co-ordinates axes.
      constructor(x){
        this.x = x;
        this.y = random(0,height);
        this.r = random(1,8);
        this.xSpeed = random(-3,-1);    //towards left
        this.ySpeed = random(-0.5,0.5);
      }
    
    // creation of a particle.
      createParticle() {
        noStroke();
        fill('rgba(200,169,169,0.5)');
        circle(this.x,this.y,this.r);
      }
    
    // setting the particle in motion.
      moveParticle() {
        // if(this.x < 0 || this.x > width)
        //   this.xSpeed*=-1;
        // if(this.y < 0 || this.y > height)
        //   this.ySpeed*=-1;
        this.x+=this.xSpeed;
        this.y+=this.ySpeed;
      }
    
    // // this function creates the connections(lines)
    // // between particles which are less than a certain distance apart
    //   joinParticles(particles) {
    //     particles.forEach(element =>{
    //       let dis = dist(this.x,this.y,element.x,element.y);
    //       if(dis<85) {
    //         stroke('rgba(255,255,255,0.04)');
    //         line(this.x,this.y,element.x,element.y);
    //       }
    //     });
    //   }
    }