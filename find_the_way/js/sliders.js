console.log("sliders.js loaded");


// Actualisation des valeurs selon les sliders
function updateSliders() {
    restitution = restitutionSlider.value;
    generalMass = massSlider.value;
    friction = frictionSlider.value;
    console.log("restitution : " + restitution + " | generalMass : " + generalMass + " | friction : " + friction);

    // Update des labels 
    document.getElementById("restitutionLabel").innerHTML = "Restitution : " + restitution;
    document.getElementById("massLabel").innerHTML = "Masse : " +  generalMass;
    document.getElementById("frictionLabel").innerHTML = "Friction : " + friction;
}

// Slider de restitution
const restitutionSlider = document.getElementById('restitutionSlider');
restitution = parseInt(restitutionSlider.value);

// Slider de masse
const massSlider = document.getElementById('massSlider');
generalMass = parseInt(massSlider.value);

// Slider de friction
const frictionSlider = document.getElementById('frictionSlider');
friction = parseInt(frictionSlider.value);
