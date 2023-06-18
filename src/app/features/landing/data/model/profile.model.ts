export interface ProfileModel {
    name: string;
    email: string;
    avatar: string;
    readme_markdown: string;
    social: Social[];
}

export interface Social {
    icon: string;
    url: string;
    target: string;
    color: string;
}