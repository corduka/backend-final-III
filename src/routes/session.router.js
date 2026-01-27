

import UserDTO from '../dao/DTOs/UserDTO.js';



router.get('/current', passportCall('current'), (req, res) => {
    // req.user is populated by the 'current' strategy (e.g., JWT)
    const userDTO = new UserDTO(req.user); 
    res.send({ status: "success", payload: userDTO });
});