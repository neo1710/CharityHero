export default function AllRoutes(){
    return(
        <Routes>
        <Route path="/requests" element={<Requests/>}/>
        <Route path="/requests/:id" element={<SingleRequestCard/>}/>
        <Route path="/user" element={<UserPage/>}/>
    </Routes>
    )
}