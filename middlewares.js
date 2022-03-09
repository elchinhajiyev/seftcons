const ROLE= {
    ADMIN: 'admin',
    EXPERT: 'expert',
    TEAMLEADER: 'team-leader',
    USER: '',
};


function authPages(role) {
return (req, res, next) =>{
   if(req.user.role !== role){
      return res.redirect('/notaccess')
   }
   next () 
}
}

function authPagesTeamLeader(role) {
    return (req, res, next) =>{
       if(req.user.role !== role){
          return res.redirect('/notaccess')
       }
       next () 
    }
    }

    function authAdmin(role) {
      return (req, res, next) =>{
         if(req.user.role === role){
            return res.redirect('/notaccess')
         }
         next () 
      }
      }

module.exports ={authPages, authPagesTeamLeader,ROLE, authAdmin};