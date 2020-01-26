import createStore from 'unistore'
import axios from 'axios'


const initialState={
        listUserProduct:"",
        new_payment_ss:"",
        active_cart_id:0,
        listUser:[],
        qty:[1,2,3],
        courier:["jne","pos","tiki"],
        picked_courier:"",
        picked_qty:0,
        active_product_id:0,
        listProduk:[],
        picked_product:[],
        username:"",
        password:"",
        confirm_password:"",
        email:"",
        full_name:"",
        isLoading:true,
        keyword: "",
        slice:5,
        kota:"",
        telp:"",
        checkout:[],
        etc:[],
        cart:[],
        dashboard:[],
        courier:["jne","pos","tiki"],
        user_id:0,
        nama_produk: "",
        category: "",
        harga: 0,
        stok: 0,
        berat: 0,
        gambar: "",
        preview_1:"",
        preview_2: "",
        preview_3: "",
        description: "",
        deleted:"False",
        profile:[],
        nama:"",
        alamat:"",
        payment:"",
        id_order:0,
        profile_img:"https://elysator.com/wp-content/uploads/blank-profile-picture-973460_1280-300x300.png",
        search_res:[],
        confirm_pay:"",
        details_cart:[]
    
}


const secondState={
        cart:[],
        user_id:0,
        nama_produk: "",
        category: "",
        harga: "",
        stok: "",
        berat: "",
        gambar: "",
        preview_1:"",
        preview_2: "",
        preview_3: "",
        description: ""
    
}

export const store =createStore(initialState)
export const store_product =createStore(secondState)

export const actions = store =>({
        handleSetGlobal: (state, event) => {
                
                store.setState({ [event.target.name]: event.target.value })
              
                
        },

        handleFileUpload: (state, event) => {
                let reader = new FileReader()
                const file=event.target.files[0]
                
                reader.readAsDataURL(file)
                reader.onload = () => {
                        store.setState({ payment: reader.result})
                       
          } 
        },

        searchFunc: async(state)=>{
                const req = {method: "get",
                                url: `http://localhost:5000/products/list`,
                                headers: {"Access-Control-Allow-Origin":'*', 'Authorization':'Bearer ' + localStorage.getItem("token")}
            
                            };
                        await axios(req)
                        .then((response)=>{
                                store.setState({listProduk:response.data})
                                
                            })
                            .catch((error)=>alert(error))
                
                const key=state.keyword
                const searches=state.listProduk.map(item=>{
                       
                        if (item.nama_produk.toLowerCase().search(key) !== -1 || item.description.toLowerCase().search(key)!== -1 ){
                                return item
                        }
                })
                store.setState({linkProduk:searches})
          
        },


        
        setLoginData: (state, data) => {
                localStorage.setItem("email", data.email);
                localStorage.setItem("username", data.username);
                localStorage.setItem("avatar", data.avatar);
                localStorage.setItem("isLogin", true);
                localStorage.setItem("id_user", data.clientData.id);
                localStorage.setItem("token", data.token);
        },
        adminLogin: (state, data) => {
                localStorage.setItem("username", data.username);
                localStorage.setItem("avatar", data.avatar);
                localStorage.setItem("isLogin", "admin");
                localStorage.setItem("token", data.token);
        },  
})