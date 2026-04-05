# =============================================================================
# ProGuard Rules for Quran App
# Developer: Omar (14 years old)
# Version: 3.8.6
# =============================================================================

# -----------------------------------------------------------------------------
# Basic ProGuard Rules
# -----------------------------------------------------------------------------
-optimizationpasses 5
-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses
-dontskipnonpubliclibraryclassmembers
-dontpreverify
-verbose
-optimizations !code/simplification/arithmetic,!field/*,!class/merging/*

# -----------------------------------------------------------------------------
# Keep Android Components
# -----------------------------------------------------------------------------
-keep public class * extends android.app.Activity
-keep public class * extends android.app.Application
-keep public class * extends android.app.Service
-keep public class * extends android.content.BroadcastReceiver
-keep public class * extends android.content.ContentProvider
-keep public class * extends android.app.backup.BackupAgentHelper
-keep public class * extends android.preference.Preference

# -----------------------------------------------------------------------------
# Keep Quran App Specific Classes
# -----------------------------------------------------------------------------
-keep class com.omar.quran.** { *; }
-keepclassmembers class com.omar.quran.** { *; }

# Keep WebView JavaScript Interface
-keepclassmembers class com.omar.quran.MainActivity$WebAppInterface {
    @android.webkit.JavascriptInterface <methods>;
}

# -----------------------------------------------------------------------------
# Keep WebView
# -----------------------------------------------------------------------------
-keepclassmembers class fqcn.of.javascript.interface.for.webview {
   public *;
}
-keep public class android.webkit.WebView { *; }
-keep public class android.webkit.WebViewClient { *; }
-keep public class android.webkit.WebChromeClient { *; }

# -----------------------------------------------------------------------------
# Keep JavaScript Interfaces
# -----------------------------------------------------------------------------
-keepattributes JavascriptInterface
-keepattributes *Annotation*

# -----------------------------------------------------------------------------
# Keep Resources
# -----------------------------------------------------------------------------
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# Keep resource files
-keepclassmembers class **.R$* {
    public static <fields>;
}

# -----------------------------------------------------------------------------
# Remove Logging
# -----------------------------------------------------------------------------
-assumenosideeffects class android.util.Log {
    public static boolean isLoggable(java.lang.String, int);
    public static int v(...);
    public static int i(...);
    public static int w(...);
    public static int d(...);
    public static int e(...);
}

# -----------------------------------------------------------------------------
# Keep JSON/Data Classes
# -----------------------------------------------------------------------------
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}

# -----------------------------------------------------------------------------
# Keep Audio/Media
# -----------------------------------------------------------------------------
-keep class android.media.** { *; }
-keep class androidx.media.** { *; }

# -----------------------------------------------------------------------------
# Keep SwipeRefreshLayout
# -----------------------------------------------------------------------------
-keep class androidx.swiperefreshlayout.** { *; }

# -----------------------------------------------------------------------------
# Optimization
# -----------------------------------------------------------------------------
-allowaccessmodification
-mergeinterfacesaggressively

# -----------------------------------------------------------------------------
# Quran App Specific
# -----------------------------------------------------------------------------
# Keep all classes that might be accessed from JavaScript
-keep class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep WebView settings
-keepclassmembers class android.webkit.WebSettings {
    public *;
}
