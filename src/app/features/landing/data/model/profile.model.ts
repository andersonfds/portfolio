export interface ProfileModel {
    name: string;
    email: string;
    avatar: string;
    social: Social[];
}

export interface Social {
    icon: string;
    url: string;
    target: string;
}