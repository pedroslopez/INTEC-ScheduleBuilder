const Schedule = require('./Schedule');

function mapNum (n, in_min, in_max, out_min, out_max) {
    return (n - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

module.exports = function Population(classCodes, mutationRate, num) {
    this.population = [];
    this.matingPool = [];
    this.generations = 0;
    this.finished = false;
    
    this.mutationRate = mutationRate;
    this.perfectScore = 1;

    for(var i=0; i<num; i++) {
        this.population[i] = new Schedule(classCodes, true);
    }

    // Calculate fitness of each schedule
    this.calcFitness = function() {
        for(var i=0; i<this.population.length;i++) {
            this.population[i].calcFitness();
        }
    }
    this.calcFitness();

    this.naturalSelection = function() {
        this.matingPool = [];

        var maxFitness = 0;
        for(var i=0; i<this.population.length;i++) {
            if(this.population[i].fitness > maxFitness) {
                maxFitness = this.population[i].fitness;
            }
        }

        for(var i=0; i<this.population.length;i++) {
            var fitness = mapNum(this.population[i].fitness,0,maxFitness,0,1);
            var n = Math.floor(fitness*100);
            for(var j=0;j<n;j++) {
                this.matingPool.push(i);
            }
        }
    }

    this.generate = function() {
        var newPop = [];
        for(var i=0; i<this.population.length;i++) {
            var a = getRndInteger(0,this.matingPool.length);
            var b = getRndInteger(0, this.matingPool.length);
            var partnerA = this.population[this.matingPool[a]];
            var partnerB = this.population[this.matingPool[b]];
            var child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            newPop.push(child);
        }
        this.population = newPop;
        this.generations++;
    }

    this.getBest = function() {
        return this.best;
    }

    this.evaluate = function() {
        var record = 0.0;
        var index = 0;

        for(var i=0; i < this.population.length; i++) {
            if(this.population[i].fitness > record) {
                index = i;
                record = this.population[i].fitness;
            }
        }

        this.best = this.population[index];
        if(record === this.perfectScore) {
            this.finished = true;
        }
    }

    this.isFinished = function() {
        return this.finished;
    }

    this.getGenerations = function() {
        return this.generations;
    }

    this.print = function() {
        for(var i=0; i<this.population.length;i++) {
            this.population[i].print();
        }
    }

}