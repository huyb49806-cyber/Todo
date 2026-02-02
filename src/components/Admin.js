import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getallUsers,deleteUser } from '../redux/actions';

const UserManagement=()=>{
    const dispatch=useDispatch();
    const {user}=useSelector(state=>state.auth);
    console.log(user);
    const {listUsers}=useSelector(state=>state.admin);
    console.log(listUsers);
    useEffect(()=>{
        if(user.role==='ADMIN'){
            dispatch(getallUsers());
        }
    },[user]);

    return(
        <div>
            <h2>Quản lí user</h2>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>tên</th>
                        <th>email</th>
                        <th>role</th>
                        <th>hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers.map((i)=>(
                        <tr key={i.id}>
                            <td>{i.id}</td>
                            <td>{i.name}</td>
                            <td>{i.email}</td>
                            <td>{i.role}</td>
                            <td>
                                <button
                                    onClick={()=>dispatch(deleteUser(i.id))}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManagement;