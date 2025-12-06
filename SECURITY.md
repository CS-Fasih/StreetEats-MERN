# Security Policy

## Supported Versions

Currently supported versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of StreetEats seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please do NOT:

- Open a public GitHub issue for security vulnerabilities
- Disclose the vulnerability publicly before it has been addressed

### Please DO:

1. **Email the details to:** [Your email or create a security email]
2. **Include the following information:**
   - Type of vulnerability
   - Full paths of source file(s) related to the vulnerability
   - Location of the affected source code (tag/branch/commit or direct URL)
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if possible)
   - Impact of the issue, including how an attacker might exploit it

### What to expect:

- **Acknowledgment:** We will acknowledge receipt of your vulnerability report within 48 hours
- **Investigation:** We will investigate and validate the vulnerability
- **Fix:** We will work on a fix and coordinate with you on disclosure timing
- **Credit:** We will credit you in the security advisory (unless you prefer to remain anonymous)

## Security Best Practices

When using StreetEats in production:

### Environment Variables
- ✅ Change `JWT_SECRET` to a strong, random string (64+ characters)
- ✅ Use strong database credentials
- ✅ Never commit `.env` files to version control

### Authentication
- ✅ Change default admin password immediately
- ✅ Implement password complexity requirements
- ✅ Consider adding rate limiting for login attempts
- ✅ Enable two-factor authentication (future enhancement)

### Database
- ✅ Use MongoDB Atlas or secured MongoDB instance
- ✅ Enable database authentication
- ✅ Restrict database network access
- ✅ Regular database backups

### API Security
- ✅ Use HTTPS in production
- ✅ Implement CORS properly for your domain
- ✅ Add rate limiting to prevent abuse
- ✅ Validate and sanitize all user inputs
- ✅ Keep dependencies updated

### Deployment
- ✅ Use environment-specific configurations
- ✅ Enable security headers (helmet.js)
- ✅ Monitor application logs
- ✅ Implement proper error handling (don't expose stack traces)

## Known Security Considerations

### Current Implementation

1. **JWT Tokens:** 
   - Tokens expire after 30 days
   - Consider implementing refresh tokens for better security

2. **Password Policy:**
   - Minimum 6 characters required
   - Consider enforcing stronger passwords in production

3. **Admin Creation:**
   - Admin accounts created via seed script only
   - Ensures no public admin registration

4. **Session Management:**
   - Tokens stored in localStorage
   - Consider httpOnly cookies for enhanced security

## Security Updates

We will release security updates as needed and notify users through:
- GitHub Security Advisories
- Release notes
- README updates

## Compliance

This project follows:
- OWASP Top 10 security practices
- JWT best practices
- MongoDB security guidelines

---

Last Updated: December 6, 2025
