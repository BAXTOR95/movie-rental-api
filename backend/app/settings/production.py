from __future__ import absolute_import, unicode_literals
import dj_database_url

from .base import *

env = os.environ.copy()


DEBUG = False

SECRET_KEY = os.environ.get(
    'SECRET_KEY', default='django-insecure-&*)838bj5l=f*gx*wg5hk!)u)8qy+_(kru74si1ockw*rt-n2^')

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

ALLOWED_HOSTS = ['*']

if "DATABASE_URL" in env:
    DATABASES['default'] = dj_database_url.config(
        conn_max_age=600, ssl_require=True)

# # AWS

# AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME')
# AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
# AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
# AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
# AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
# AWS_DEFAULT_ACL = 'public-read'
# AWS_S3_FILE_OVERWRITE = False
# AWS_LOCATION = 'static'

# # Boto3

# DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

# Static files

# STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_LOCATION}'
