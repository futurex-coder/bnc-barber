import { PageHeading } from "@/components/admin/PageHeading";
import { ContactsForm } from "@/components/admin/forms/ContactsForm";
import { getSettingsRow } from "@/lib/admin/read";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const settings = await getSettingsRow();

  return (
    <div>
      <PageHeading
        title="Контакти"
        description="Телефон, имейл, Instagram и линкове. Адресите и картите идват от Локации."
      />
      <ContactsForm settings={settings} />
    </div>
  );
}
