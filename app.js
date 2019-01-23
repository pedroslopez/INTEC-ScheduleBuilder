const Population = require('./Population');

var selection = [
    // {code: "CBM203", section: ["06"]}, Force a section 
    // {code: "ING210", section: ["01", "06", "07", "08"]}, Select from specific sections
    // {code: "IDS336"}, // Select from available sections
    
    {code: "ADM315"}, // Administracion y Gestion empresarial 
    {code: "IDS335"}, // Diseño de software
    {code: "INS380"}, // Base de datos II
    {code: "INS380L"}, // Lab base de datos II
    {code: "INS314", section: ["01"]}, // Comunicacion de Datos I
    {code: "INS314", section: ["71"]} // Lab comun datos I
];

const mutationRate = 0.01;
const popMax = 50;
const maxGenerations = 1000; // When this number is reached, the best to date will be selected 
                             // (it usually means the schedule was impossible to generate without conflicts)

var population = new Population(selection, mutationRate, popMax);

while(!population.isFinished()) {
    population.naturalSelection();
    population.generate();
    population.calcFitness();
    population.evaluate();
    console.log('Generation ' + population.getGenerations());

    if(maxGenerations && population.getGenerations() == maxGenerations) {
        console.log('FAILED. REACHED MAX NUMBER OF GENERATIONS. THE BEST FOUND TO DATE WILL BE PRINTED.');
        break;
    }
}

console.log('DONE!');
population.getBest().print();
console.log('Credits: ' + population.getBest().getCredits());
console.log('Winning fitness: ' + population.getBest().fitness);



