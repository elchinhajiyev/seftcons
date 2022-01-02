const instReports = document.querySelectorAll('.instreport');
instReports.forEach(instreport =>{
    instreport.addEventListener('click', ()=>{
        instreport.classList.toggle('active');
    });
});
