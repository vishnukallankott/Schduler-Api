const {addCandidate,getCandidates,getCandidate,reschduleCandidates,deleteCandidate,updateCandidateDetails,getCandidatesWithFailedEmails}=require('../controller/candidates')
module.exports=function(router){
    router.post('/candidates',addCandidate)
    router.get('/candidates',getCandidates)
    router.get('/candidates/:id',getCandidate)
    router.get('/candidates-failed-emails',getCandidatesWithFailedEmails)
    router.put('/candidates/:id',updateCandidateDetails)
    router.delete('/candidates/:id',deleteCandidate)
    router.patch('/candidates/:id',reschduleCandidates)

    return router;
}