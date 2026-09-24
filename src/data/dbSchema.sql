-- ============================================================================
-- SOVEREIGN ADVISORY & RESIDENCY PLATFORM - ENTERPRISE POSTGRESQL DDL SCHEMA
-- Target DB: PostgreSQL 15+ (Compatible with Supabase, AWS RDS, GCP Cloud SQL)
-- Author: Principal Enterprise Architect
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. ENUM TYPES
-- ----------------------------------------------------------------------------
CREATE TYPE staff_role_enum AS ENUM (
  'SUPER_ADMIN',
  'LEGAL_PRO_CONSULTANT',
  'CASE_FILING_OFFICER',
  'SEO_CONTENT_EDITOR'
);

CREATE TYPE dossier_stage_enum AS ENUM (
  'LEAD_INGESTION',
  'COMPLIANCE_AUDIT',
  'GOVERNMENT_FILING',
  'IN_COUNTRY_STATUS',
  'VIP_BIOMETRICS_MEDICAL',
  'STAMPING_HANDOVER'
);

CREATE TYPE priority_sla_enum AS ENUM ('STANDARD', 'HIGH', 'VIP_URGENT');

CREATE TYPE doc_status_enum AS ENUM ('PENDING_REVIEW', 'APPROVED', 'REJECTED', 'EXPIRED');

CREATE TYPE article_status_enum AS ENUM ('DRAFT', 'SCHEDULED', 'PUBLISHED');

-- ----------------------------------------------------------------------------
-- 2. USERS (STAFF & RBAC)
-- ----------------------------------------------------------------------------
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role staff_role_enum NOT NULL DEFAULT 'CASE_FILING_OFFICER',
  avatar_url TEXT,
  phone VARCHAR(50),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 3. CLIENTS DIRECTORY
-- ----------------------------------------------------------------------------
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(150) NOT NULL,
  nationality VARCHAR(80) NOT NULL,
  phone_whatsapp VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  passport_number VARCHAR(80),
  passport_expiry_date DATE,
  company_name VARCHAR(150),
  source_channel VARCHAR(80) DEFAULT 'WEBSITE_CALCULATOR',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 4. DOSSIERS (OPERATIONAL CRM PIPELINE)
-- ----------------------------------------------------------------------------
CREATE TABLE dossiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dossier_number VARCHAR(50) UNIQUE NOT NULL,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  service_id VARCHAR(100) NOT NULL,
  stage dossier_stage_enum NOT NULL DEFAULT 'LEAD_INGESTION',
  priority priority_sla_enum NOT NULL DEFAULT 'STANDARD',
  government_ref_no VARCHAR(100),
  is_inside_uae BOOLEAN NOT NULL DEFAULT TRUE,
  adult_dependants_count INT NOT NULL DEFAULT 1,
  child_dependants_count INT NOT NULL DEFAULT 0,
  government_tariff_total NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  advisory_retainer_fee NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  total_contract_value NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  assigned_staff_id UUID REFERENCES users(id),
  target_completion_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 5. ENCRYPTED DOCUMENTS VAULT
-- ----------------------------------------------------------------------------
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dossier_id UUID NOT NULL REFERENCES dossiers(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  document_type VARCHAR(100) NOT NULL, -- 'PASSPORT', 'TITLE_DEED', 'ATTESTED_CERT'
  encrypted_storage_path TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  status doc_status_enum NOT NULL DEFAULT 'PENDING_REVIEW',
  expiry_date DATE,
  encryption_hash VARCHAR(128) NOT NULL,
  uploaded_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 6. TARIFFS & CALCULATOR RULES
-- ----------------------------------------------------------------------------
CREATE TABLE tariffs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category VARCHAR(80) NOT NULL, -- 'MAINLAND_DED', 'FREE_ZONE', 'IMMIGRATION_ICP'
  authority VARCHAR(80) NOT NULL, -- 'DED_DUBAI', 'ICP_FEDERAL', 'GDRFA_DUBAI'
  item_code VARCHAR(80) UNIQUE NOT NULL,
  item_name VARCHAR(200) NOT NULL,
  govt_fee_aed NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  retainer_markup_aed NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  inside_country_surcharge_aed NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 7. SERVICE PAGES CMS
-- ----------------------------------------------------------------------------
CREATE TABLE service_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(120) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  hero_headline TEXT NOT NULL,
  hero_subtext TEXT NOT NULL,
  eligibility_criteria JSONB NOT NULL DEFAULT '[]'::jsonb,
  required_documents JSONB NOT NULL DEFAULT '[]'::jsonb,
  pricing_table JSONB NOT NULL DEFAULT '[]'::jsonb,
  sla_timeline JSONB NOT NULL DEFAULT '[]'::jsonb,
  faq_collection JSONB NOT NULL DEFAULT '[]'::jsonb,
  meta_seo JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 8. EDITORIAL ARTICLES & BLOG
-- ----------------------------------------------------------------------------
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(150) UNIQUE NOT NULL,
  title VARCHAR(250) NOT NULL,
  summary TEXT,
  content_markdown TEXT NOT NULL,
  category VARCHAR(80) NOT NULL DEFAULT 'Golden Visa',
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  status article_status_enum NOT NULL DEFAULT 'DRAFT',
  seo_meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  author_id UUID REFERENCES users(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 9. IMMUTABLE SYSTEM AUDIT LOGS
-- ----------------------------------------------------------------------------
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id UUID REFERENCES users(id),
  user_name VARCHAR(120) NOT NULL,
  user_role staff_role_enum NOT NULL,
  ip_address VARCHAR(45) NOT NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(80) NOT NULL,
  entity_id VARCHAR(100) NOT NULL,
  change_diff JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- ----------------------------------------------------------------------------
-- INDEXES FOR HIGH-PERFORMANCE QUERYING
-- ----------------------------------------------------------------------------
CREATE INDEX idx_dossiers_stage ON dossiers(stage);
CREATE INDEX idx_dossiers_client_id ON dossiers(client_id);
CREATE INDEX idx_documents_dossier_id ON documents(dossier_id);
CREATE INDEX idx_articles_status_pub ON articles(status, published_at);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp DESC);

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES EXAMPLE
-- ----------------------------------------------------------------------------
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE dossiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Super Admins have full access
CREATE POLICY super_admin_all ON dossiers FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'SUPER_ADMIN')
);

-- PRO Consultants access assigned dossiers
CREATE POLICY pro_consultant_assigned ON dossiers FOR ALL USING (
  assigned_staff_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('SUPER_ADMIN', 'LEGAL_PRO_CONSULTANT'))
);
