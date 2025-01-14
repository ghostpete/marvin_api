
export const generateHTMLForEmailToClient = function (
    name, 
    email, 
    phone,
    country, 
    amount, 
    transaction_date, 
    comment,
    tmethod
) {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h1 style="color: #4CAF50;">Hello, admin. </h1>
            <p>A client filed a complaint. Here are the details of the filed complaint:</p>
            <table border="1" cellspacing="0" cellpadding="10" style="border-collapse: collapse; width: 100%; max-width: 600px; margin: 20px 0;">
                <tr>
                    <th style="background-color: #f2f2f2; text-align: left;">Field</th>
                    <th style="background-color: #f2f2f2; text-align: left;">Value</th>
                </tr>
                <tr>
                    <td><strong>Name</strong></td>
                    <td>${name}</td>
                </tr>
                <tr>
                    <td><strong>Email</strong></td>
                    <td>${email}</td>
                </tr>
                <tr>
                    <td><strong>Phone</strong></td>
                    <td>${phone}</td>
                </tr>
                <tr>
                    <td><strong>Country</strong></td>
                    <td>${country}</td>
                </tr>
                <tr>
                    <td><strong>Amount</strong></td>
                    <td>${amount}</td>
                </tr>
                <tr>
                    <td><strong>Payment Method</strong></td>
                    <td>${tmethod}</td>
                </tr>
                <tr>
                    <td><strong>Transaction Date</strong></td>
                    <td>${transaction_date}</td>
                </tr>
                <tr>
                    <td><strong>Comment</strong></td>
                    <td>${comment}</td>
                </tr>
            </table>
            <p style="margin-top: 20px;">Best regards,<br>Your Company</p>
        </div>
    `;
};
