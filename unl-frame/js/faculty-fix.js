// FACULTY SECTIONS FIX - EMERGENCY SOLUTION
console.log('🚨 Loading Faculty Emergency Fix');

document.addEventListener('DOMContentLoaded', function() {
  console.log('📱 Faculty Emergency Fix - Starting');
  
  // Buscar todos los bloques de facultades
  const facultyBlocks = document.querySelectorAll('.offer__block--hover');
  console.log(`Found ${facultyBlocks.length} faculty blocks`);
  
  if (facultyBlocks.length === 0) {
    console.error('❌ No faculty blocks found!');
    return;
  }

  // Forzar la visibilidad de todos los bloques
  facultyBlocks.forEach((block, index) => {
    console.log(`🔧 Fixing block ${index + 1}`);
    
    // Forzar estilos directamente
    block.style.opacity = '1';
    block.style.transform = 'translateY(0)';
    block.style.visibility = 'visible';
    block.style.display = 'block';
    
    // Buscar imagen dentro del bloque
    const img = block.querySelector('img');
    if (img) {
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
      img.style.visibility = 'visible';
      console.log(`✅ Image fixed for block ${index + 1}`);
    }
    
    // Buscar título dentro del bloque
    const title = block.querySelector('h3');
    if (title) {
      title.style.opacity = '1';
      title.style.transform = 'translateY(0)';
      title.style.visibility = 'visible';
      console.log(`✅ Title fixed for block ${index + 1}`);
    }
    
    // Agregar clase de animación
    block.classList.add('animate-in');
  });
  
  console.log('✅ Faculty Emergency Fix - Completed');
});
