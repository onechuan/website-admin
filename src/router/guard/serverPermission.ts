import { Router } from "vue-router";

export default function setupServerPermissionGuard(router: Router){
    router.beforeEach(async (to, from, next)=>{
        // 针对来自服务器的菜单配置进行处理
        const appStore = 
    })
}