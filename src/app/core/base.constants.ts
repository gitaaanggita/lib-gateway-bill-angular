import { environment } from './../../environments/environment';

// API Base Url
export const BASE_URL_API = environment.apiUrl + '/public';
export const BASE_URL_API_NEW = environment.apiUrl;
export const BASE_URL_API_NEW_PROD = 'https://saladin.uii.ac.id';

export const BASE_URL_API_PERSONAL = environment.apiUrl + '/v1/personal-management';

// Server API BASE URL

// AUTH API ENDPOINT
// REPORT API ENDPOINT

export const REPORT_ENDPOINT = {
    SKPI_ADMIN: BASE_URL_API + '/report/skpi?skpi',
    SKPI_MAHASISWA: BASE_URL_API + '/report/skpi?preview'
};

// DASHBOARD API ENDPOINT
export const DASHBOARD_ENDPOINT = {
    BASE: BASE_URL_API + '/dasbor',
    MAHASISWA_BARU: BASE_URL_API + '/dasbor/mahasiswabaru',
    MAHASISWA: BASE_URL_API + '/dasbor/mahasiswa',
    KEUANGAN: BASE_URL_API + '/dasbor/keuangan',
    KEPEGAWAIAN: BASE_URL_API + '/dasbor/kepegawaian'
};


// SKPI API ENDPOINT
export const SKPI_ENDPOINT = {
    BASE: BASE_URL_API + '/skpi',
    GENERAL_INFO: BASE_URL_API + '/skpi/infoumum',
    MASTER_ORGANISASI: BASE_URL_API + '/skpi/master/organisasi',
    MASTER_THN_AKADEMIK: BASE_URL_API + '/skpi/master/thakademik',
    MASTER_SEMESTER: BASE_URL_API + '/skpi/master/semester',
    MASTER_PERIODE: BASE_URL_API + '/skpi/master/periode',
    MASTER_STATUS: BASE_URL_API + '/skpi/master/status',
    MASTER_CPL: BASE_URL_API + '/skpi/cpl',
    MASTER_KURIKULUM: BASE_URL_API + '/skpi/master/kurikulum',
    MASTER_RANAH: BASE_URL_API + '/skpi/master/ranah'
};

// PERSONAL API ENDPOINT
export const PERSONAL_ENDPOINT = {
    DATA_DIRI_BASE: BASE_URL_API_PERSONAL + '/data-diri',
    CONTACT_BASE: BASE_URL_API_PERSONAL + '/kontak',
    IDENTITY_BASE: BASE_URL_API_PERSONAL + '/identitas',
    EMERGENCY_CONTACT_BASE: BASE_URL_API_PERSONAL + '/kontak-darurat',
    HOBBY_BASE: BASE_URL_API_PERSONAL + '/hobi',
    ACHIEVEMENT_BASE: BASE_URL_API_PERSONAL + '/prestasi',
    TRAINING_BASE: BASE_URL_API_PERSONAL + '/pelatihan',
    PERSONAL_LANGUAGE_BASE: BASE_URL_API_PERSONAL + '/bahasa',
    PERSONAL_SKILL_BASE: BASE_URL_API_PERSONAL + '/keahlian',
    PERSONAL_ADDRESS_BASE: BASE_URL_API_PERSONAL + '/alamat',
    COUNTRY_BASE: BASE_URL_API_PERSONAL + '/wilayah',
    ADDRESS_STATUS_BASE: BASE_URL_API_PERSONAL + '/status-alamat',
    FAMILY_BASE: BASE_URL_API_PERSONAL + '/keluarga',
    EDUCATIONAL_LEVEL_BASE: BASE_URL_API_PERSONAL + '/jenjang-pendidikan',
    YEAR_BASE: BASE_URL_API_PERSONAL + '/tahun'
};

// MASTER DATA API ENDPOINT
export const REFERENCE_ENDPOINT = {
    BASE: BASE_URL_API + '/master/reference',
    REGION: BASE_URL_API + '/master/',
    TEMPLATE_REPORT: BASE_URL_API + '/master/report',
    COUNTRY: BASE_URL_API + '/master/region/country',
    PROVINCE: BASE_URL_API + '/master/region/province',
    DISTRICT: BASE_URL_API + '/master/region/district',
    SUBDISTRICT: BASE_URL_API + '/master/region/subdistrict',
    COLLEGE: BASE_URL_API + '/master/college',
    ACCREDITATION: BASE_URL_API + '/master/accreditation'
};

// RAS MASTER API ENDPOINT
export const RAS_ENDPOINT = {
    OFFICER_BASE: BASE_URL_API_NEW + '/v1/ras-officer/'
};

// SKP API ENDPOINT
export const SKP_ENDPOINT = {
    BASE: BASE_URL_API + '/skp-master/masterdata',
    TYPE: BASE_URL_API + '/skp-master/mastertype',
    RANGE: BASE_URL_API + '/skp-master/range',
    ACTIVITY: BASE_URL_API + '/skp-activity/activities',
    ORGANIZATION: BASE_URL_API + '/skp-activity/organization',
    PARTICIPATION: BASE_URL_API + '/skp-participant/participation'
};

// MONITOR API ENDPOINT
export const MONITOR_ENDPOINT = {
    OVERVIEW: BASE_URL_API_NEW + '/monitor-pmb/v1',
    CBT: BASE_URL_API_NEW + '/monitor-cbt/v1',
    PBT: BASE_URL_API_NEW + '/monitor-pbt/v1',
    PSB: BASE_URL_API_NEW + '/monitor-psb/v1',
    PHA: BASE_URL_API_NEW + '/monitor-pha/v1'
};

// SCHEDULE API ENDPOINT
export const SCHEDULE_ENDPOINT = {
    REGULAR: BASE_URL_API_NEW + '/v1/schedule',
    BLOCK: BASE_URL_API_NEW + '/v1/schedule-block/'
};

// Constant Variable
export const SYSTEM_SETTING = {
    PAGE_LIMIT: 10,
    NOTIFICATION_INTERVAL: 60000
};

export const DATA_TYPE = {
    PERSON: 'person',
    COLLEGE: 'college',
    UNIT: 'unit',
    APPLICATION: 'application',
    MENU: 'menu',
    MODULE: 'module',
    USER: 'user',
    GROUP: 'group',
    ROLE: 'role',
    PARTNER: 'partner'
};

export const STATUS = [
    { value: 0, label: 'published' },
    { value: 1, label: 'trashed' }
];

export const PROGRES_STATUS = {
    REVISED: 'terevisi',
    VERIFIED: 'terverifikasi',
    VALIDATED: 'tervalidasi',
    PRINTED: 'tercetak'
};

export const GROUP = {
    MAHASISWA: 'Mahasiswa',
    AKADEMIK_FAKULTAS: 'Akademik Fakultas'
};

export const FORM_STATUS = {
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update'
};

export const AUTH_TYPE = {
    ACTIVATE: 'aktivasi',
    READ: 'read',
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    PRINT: 'print',
    VERIFY: 'verifikasi',
    VALIDATE: 'validasi',
    PUBLISH: 'terbit',
    EXP_IMP: 'exp_imp'
};

export const NOTIFICATION_TYPE = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
};

export const MODAL = {
    ALERT: {
        INFO: 'modal-alert modal-info',
        SUCCESS: 'modal-alert modal-info',
        WARNING: 'modal-alert modal-warning',
        DANGER: 'modal-alert modal-danger'
    },
    DETAIL: {
        DEFAULT: 'modal-detail',
        MEDIUM: 'modal-md modal-detail',
        LARGE: 'modal-lg modal-detail',
        XL: 'modal-xl modal-detail'
    }
};

export const SELECT_YES_NO = [
    { label: 'Ya', value: 1 },
    { label: 'Tidak', value: 0 }
];

export const MINIMAL_SCORE = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' }
];

