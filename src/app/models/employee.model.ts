export class EmployeeModel {
    id: string;
    names: string;
    lastNames: string;
    identification: number;
    role: string;
    state: string;
    phoneNumber: string;
    email: string;

    constructor(data: any) {
        this.id = data ? data.doc.id : null;
        this.names = data ? data.doc.data().names : null;
        this.lastNames = data ? data.doc.data().lastNames : null;
        this.identification = data ? data.doc.data().identification : null;
        this.role = data ? data.doc.data().role : null;
        this.state = data ? data.doc.data().state : null;
        this.phoneNumber = data ? data.doc.data().phoneNumber : null;
        this.email = data ? data.doc.data().email : null;
    }

    public getFullName() {
        return `${this.names} ${this.lastNames}`;
    }

    public getRole() {
        return this.role;
    }
}