export default {
    template : `
    <div class="logsign">
    <div class="main">
        <input type="checkbox" id="chk" aria-hidden="true">
            <div class="signup">
                    <label for="chk" aria-hidden="true">Sign up</label>
                    <input type="text" name="name" placeholder="User name" required="" autocomplete="off" v-model="s.name">
                    <input type="email" name="email" placeholder="Email" required="" autocomplete="off" v-model="s.email">
                    <input type="password" name="password" placeholder="Password" required="" v-model="s.password">
                    <button type="submit" @click='signup'>Sign up</button>
            </div>
    
            <div class="login">
                    <label for="chk" aria-hidden="true">Login</label>
                    <input type="email" name="email" placeholder="Email" required="" autocomplete="off" v-model="l.email">
                    <input type="password" name="password" placeholder="Password" required="" v-model="l.password">
                    <button type="submit" @click='login' class="signbtn">Login</button>
            </div>
    </div>
    </div>
    `,
    data(){
        return {
            s: {
                email: null,
                password: null,
                name: null
            },
            l: {
                email: null,
                password: null
            },
            error : ""
        }
    },
    methods : {
        async login(){
            const res = await fetch('/login', {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.l),
            }).then((res) => {
                return res.json();
            }).then((data) => {
            console.log(data);
            if (data.role == "user"){
                localStorage.setItem('auth-token', data.token);
                localStorage.setItem('current_user', data.id);
                localStorage.setItem('current_role', data.role);
                console.log(localStorage.getItem('auth-token'));
                this.$router.push({ path: '/home' });
            }
            else if (data.role == "manager"){
                localStorage.setItem('auth-token', data.token);
                localStorage.setItem('current_user', data.id);
                localStorage.setItem('current_role', data.role);
                this.$router.push({ path: '/home' });
            }
            else if (data.role == "admin"){
                localStorage.setItem('auth-token', data.token);
                localStorage.setItem('current_user', data.id);
                localStorage.setItem('current_role', data.role);
                this.$router.push({ path: '/home' });
            }
            else if (data.message == "Invalid Credentials"){
                this.$router.push({ path: '/' });
            }

            })
        },
        async signup(){
            const res = await fetch('/signup', {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.s),
            })
            const data = await res.json()
            if (res.ok) {
                localStorage.setItem('auth-token', data.token);
                localStorage.setItem('current_user', data.id);
                localStorage.setItem('current_role', data.role);
                this.$router.push({ path: '/home' })
            } else {
                this.error = data.message
                console.log(this.error);
            }
        }
    },
    created() {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('current_user');
        localStorage.removeItem('current_role');
    }
}