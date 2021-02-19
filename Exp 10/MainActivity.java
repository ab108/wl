package com.example.Exp10_Multithreading;

import androidx.appcompat.app.AppCompatActivity;
import android.nfc.Tag;
import android.os.Handler;
import android.os.Looper;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import com.example.multithreading.R;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    private Button buttonStartThread;
    private Handler mainHandler = new  Handler();
    private volatile boolean stopThread= false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        buttonStartThread = findViewById(R.id.startbtn);
    }
    public void startThread(View view){
        stopThread = false;
        ExampleRunnable runnable= new ExampleRunnable(10);
        new Thread(runnable).start();

    }


    public void stopThread(View view) {
        stopThread = true;
    }
    class ExampleRunnable implements Runnable {
        int seconds;
        ExampleRunnable(int seconds){
            this.seconds=seconds;
        }
        @Override
        public void run(){
            for(int i = 0;i<seconds;i++){
                if (stopThread)
                    return;
                if(i == 5){
                    /*Handler threadHandler = new Handler(Looper.getMainLooper());
                    threadHandler.post(new Runnable(){
                        @Override
                        public void run(){
                            buttonStartThread.setText("50%");
                        }
                    });*/
                    runOnUiThread(new Runnable(){
                        @Override
                        public void run(){
                            buttonStartThread.setText("50%");
                        }
                    });
                }
                Log.d(TAG, "startThread: " + i);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}




