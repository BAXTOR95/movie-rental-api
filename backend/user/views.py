# from rest_framework import generics, permissions, views, status
# from rest_framework.response import Response
# from rest_framework_simplejwt import authentication, tokens

# from user.serializers import UserSerializer, LogoutSerializer


# class CreateUserView(generics.CreateAPIView):
#     """Create a new user in the system
#     """
#     serializer_class = UserSerializer


# class ManageUserView(generics.RetrieveUpdateAPIView):
#     """Manage the authenticated user
#     """
#     serializer_class = UserSerializer
#     authentication_classes = (authentication.JWTAuthentication,)
#     permission_classes = (permissions.IsAuthenticated,)

#     def get_object(self):
#         """Retrieve and return authenticated user
#         """
#         return self.request.user


# class LogoutView(views.APIView):
#     """Manage logout functionality
#     """
#     serializer_class = LogoutSerializer
#     authentication_classes = (authentication.JWTAuthentication,)
#     permission_classes = (permissions.IsAuthenticated,)

#     def post(self, request):
#         try:
#             refresh_token = request.data['refresh']
#             token = tokens.RefreshToken(refresh_token)
#             token.blacklist()

#             return Response(status=status.HTTP_205_RESET_CONTENT)
#         except Exception:
#             return Response(status=status.HTTP_400_BAD_REQUEST)
