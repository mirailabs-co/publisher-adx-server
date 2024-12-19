export interface TelegramInitData {
  auth_date: string;
  chat_instance: string;
  chat_type: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    allows_write_to_pm: boolean;
  };
  referral_by?: string;
}
