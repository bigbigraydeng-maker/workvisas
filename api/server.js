require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/contact', async (req, res) => {
  try {
    const {
      companyName,
      contactName,
      phone,
      email,
      isAewvEmployer,
      industry,
      workerCount,
      location,
      message
    } = req.body;

    if (!companyName || !contactName || !phone || !email || !isAewvEmployer || !industry || !workerCount || !location) {
      return res.status(400).json({ error: '请填写所有必填字段' });
    }

    const emailHtml = `
      <h2>新的雇主咨询</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 200px;">公司名称</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${companyName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">联系人姓名</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${contactName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">联系电话</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">电子邮箱</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">AEWV认证雇主</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${isAewvEmployer}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">所属行业</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${industry}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">预计工人数量</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${workerCount}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">公司所在地</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${location}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">补充说明</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${message || '无'}</td>
        </tr>
      </table>
      <p style="margin-top: 20px; color: #666;">此邮件来自 WorkVisas.work 网站联系表单</p>
    `;

    const emailText = `
新的雇主咨询

公司名称: ${companyName}
联系人姓名: ${contactName}
联系电话: ${phone}
电子邮箱: ${email}
AEWV认证雇主: ${isAewvEmployer}
所属行业: ${industry}
预计工人数量: ${workerCount}
公司所在地: ${location}
补充说明: ${message || '无'}

此邮件来自 WorkVisas.work 网站联系表单
    `;

    const { data, error } = await resend.emails.send({
      from: 'WorkVisas.work <noreply@workvisas.work>',
      to: [process.env.TO_EMAIL || 'hello@workvisas.work'],
      subject: `新雇主咨询 - ${companyName}`,
      html: emailHtml,
      text: emailText,
      replyTo: email
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: '发送邮件失败，请稍后重试' });
    }

    res.json({ success: true, message: '提交成功！我们的团队将在24小时内与您联系。', id: data.id });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: '服务器错误，请稍后重试' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
