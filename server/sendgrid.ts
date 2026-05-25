export async function addToSendGridList(data: {
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  agency: string;
  suburb: string;
  dealsPerMonth: string;
  leadSource: string;
}): Promise<void> {
  const response = await fetch("https://api.sendgrid.com/v3/marketing/contacts", {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${process.env.SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      list_ids: ["8ce482bb-41a8-44ba-933c-93753e38701f"],
      contacts: [{
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.mobile,
        custom_fields: {
          e4_T: data.agency,
          e5_T: data.suburb,
          e6_T: data.dealsPerMonth,
          w4_T: data.leadSource,
        },
      }],
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`SendGrid error ${response.status}: ${body}`);
  }
  console.log(`SendGrid: ${data.email} added to RE Growth Map Leads`);
}
