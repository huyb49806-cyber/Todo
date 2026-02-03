import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getallUsers,deleteUser} from '../redux/actions';

const UserManagement=()=>{
    const dispatch=useDispatch();
    const {user}=useSelector(state=>state.auth);
    // console.log(user);
    const {listUsers}=useSelector(state=>state.admin);
    console.log(listUsers);
    useEffect(()=>{
        if(user?.role==='ADMIN'){
            dispatch(getallUsers());
        }
    },[user]);

    return(
        <div className='user-management'>
            <h2>Quản lí user</h2>
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>tên</th>
                        <th>email</th>
                        <th>role</th>
                        <th style={{textAlign:'center'}}>hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers.map((i)=>(
                        <tr key={i.id}>
                            <td>{i.id}</td>
                            <td>{i.name}</td>
                            <td>{i.email}</td>
                            <td>
                                <span className={`role-badge ${i.role==='ADMIN'?'admin':'user'}`}>
                                    {i.role}
                                </span>
                            </td>
                            <td style={{textAlign:'center'}}>
                                <button
                                    className='btn-delete'
                                    onClick={()=>{
                                        if(window.confirm('bạn chắc chắn muốn xóa?'))
                                            dispatch(deleteUser(i.id))
                                    }}
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