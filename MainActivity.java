package com.omar.quran;

import android.os.Bundle;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

public class MainActivity extends AppCompatActivity {
    
    private WebView webView;
    private SwipeRefreshLayout swipeRefresh;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // تهيئة العناصر
        webView = findViewById(R.id.webview);
        swipeRefresh = findViewById(R.id.swipeRefresh);
        
        // إعدادات WebView
        setupWebView();
        
        // السحب للتحديث
        setupSwipeRefresh();
        
        // تحميل التطبيق
        loadApp();
    }
    
    private void setupWebView() {
        WebSettings settings = webView.getSettings();
        
        // تفعيل JavaScript
        settings.setJavaScriptEnabled(true);
        
        // التخزين المحلي
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        
 // الوصول للملفات
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        
        // التكبير
        settings.setSupportZoom(true);
        settings.setBuiltInZoomControls(true);
        settings.setDisplayZoomControls(false);
        
        // الأداء
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setRenderPriority(WebSettings.RenderPriority.HIGH);
        
        // الوسائط
        settings.setMediaPlaybackRequiresUserGesture(false);
        
        // واجهة JavaScript
        webView.addJavascriptInterface(new WebAppInterface(), "Android");
        
        // العميل
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int progress) {
                // يمكن إضافة شريط تقدم هنا
            }
        });
        
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                swipeRefresh.setRefreshing(false);
            }
            
            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                Toast.makeText(MainActivity.this, "خطأ في التحميل", Toast.LENGTH_SHORT).show();
            }
        });
    }
    
    private void setupSwipeRefresh() {
        swipeRefresh.setOnRefreshListener(() -> {
            webView.reload();
        });
        
        swipeRefresh.setColorSchemeResources(
            android.R.color.holo_blue_bright,
            android.R.color.holo_green_light,
            android.R.color.holo_orange_light
        );
    }
    
    private void loadApp() {
        // تحميل من الملفات المحلية (Offline)
        webView.loadUrl("file:///android_asset/www/index.html");
    }
    
    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
    
    @Override
    protected void onPause() {
        super.onPause();
        webView.onPause();
    }
    
    @Override
    protected void onResume() {
        super.onResume();
        webView.onResume();
    }
    
    @Override
    protected void onDestroy() {
        webView.destroy();
        super.onDestroy();
    }
    
    // واجهة JavaScript للتواصل مع الويب
    public class WebAppInterface {
        
        @JavascriptInterface
        public void showToast(String message) {
            Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
        }
        
        @JavascriptInterface
        public String getAppVersion() {
            return "3.8.6";
        }
        
        @JavascriptInterface
        public void shareText(String text) {
            // يمكن إضافة مشاركة هنا
        }
    }
}
