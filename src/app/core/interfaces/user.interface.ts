export interface IUser {
    userId: string;
    role: string;
    name: string;
    birthDate?: string;
    org?: string;
    phone: string;
    address: string;
    email: string;
    password: string;
}

interface ILabTests {
    labId: string;
    reports: [
        {
            testName: string;
            testResult: string;
        }
    ];
    date: Date;
}
export interface IUserRecord {
    patientId  : string;
    patientName: string;
    doctorId: string;
    symptoms: string;
    diagnosis: string;
    prescription: string;
    labTests?: ILabTests;
    status: string;
    date: string;
}