const urls = {
    serverUrl: 'http://yakensolution.cloudapp.net/doctoryadmin/api'
};

const endpoints = {
    JoinUs:'/Doctors/Join' , 
    Login: '/user/WebLogin',
    ForgetPassword: '/User/forgetpassword',
    RestePassword: '/User/ResetPassword',
    UpdateAppiontments: '/Appointments/UpdateAppointmentStatus',
    UpdateAppiontmentsSlots: '/Appointments/UpdateScheduledAppointmentStatus',
    
    GetAppointments: '/Doctors/GetAppointments?',
    GetAppointmentsSlots: '/Doctors/GetSlotsAppointments?',

    GetDoctorAppointment: '/Appointments/GetDoctorAppointment?AppointmentId=',
    GetDoctorAppointmentSlots: '/Appointments/GetDoctorScheduledAppointment?AppointmentId=',

    GetSpecs: '/Specialities/GetAll',
    GetDoctors: '/Doctors/GetAll?',
    GetDoctorFacilities: '/Doctors/GetDoctorFacilities?doctorId=',
    GetSchedule: '/Doctors/GetSchedule?',
    GetScheduleSlots: '/Doctors/GetDoctorSchedule?',
    SetScheduleSlots : '/Doctors/SetDoctorSchedule' , 

    GetDocInfo: '/Doctors/GetDoctorDetails?',
    UpdateDocInfo: '/Doctors/UpdateDoctorInfo',
    GetFacilityDetails: '/Facilities/GetFacilityDetails?',
    UpdateFacilityDetails: '/Facilities/UpdateFacilityDetails',
    AllAreas: '/Areas/GetAll?lang=En',
    AllInsuranceCompines: '/Collection/GetAllInsuranceCompanies?Lang=En',
    AddInsuranceCompany: '/Facilities/AddFacilityInsuranceCompany',
    DeleteInsuranceCompany: '/Facilities/DeleteFacilityInsuranceCompany',
    UploadImg: '/Collection/UploadImage',
    UpdateFacilityImages: '/Facilities/UpdateFacilityImages',
    UpdateDoctorProfile: '/Doctors/EditProfile',
    AddSpecilityFacility: '/Specialities/AddSpecilityFacility'
};
export function endpoint(name) {
    return urls.serverUrl + endpoints[name];
}