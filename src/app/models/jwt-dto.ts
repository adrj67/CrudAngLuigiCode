export class JwtDTO {
    token: string;
    /*type: string;
    nombreUsuario: string;
    authorities: string[]; video 15 */

    // agregado video 15 
    constructor(token: string){
        this.token = token;
    }
}
