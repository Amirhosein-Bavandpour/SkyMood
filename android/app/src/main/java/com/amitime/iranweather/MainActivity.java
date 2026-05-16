package com.amitime.iranweather;

import android.os.Bundle;
import android.graphics.Color;
import android.view.Window;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Window window = getWindow();

        window.setStatusBarColor(Color.parseColor("#dbeafe"));
        window.setNavigationBarColor(Color.parseColor("#dbeafe"));
    }
}