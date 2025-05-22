package com.example.productosapi.service;

import com.example.productosapi.model.Producto;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.*;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class FirebaseService {
    private DatabaseReference databaseReference;

    @PostConstruct
    public void initialize() throws IOException {
        FileInputStream serviceAccount = new FileInputStream("src/main/resources/firebase-service-account.json");

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl("https://guille-940f1-default-rtdb.firebaseio.com/")
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }

        databaseReference = FirebaseDatabase.getInstance().getReference("productos");
    }

    public CompletableFuture<List<Producto>> getAllProductos() {
        CompletableFuture<List<Producto>> future = new CompletableFuture<>();
        
        databaseReference.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                List<Producto> productos = new ArrayList<>();
                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    Producto producto = snapshot.getValue(Producto.class);
                    producto.setId(snapshot.getKey());
                    productos.add(producto);
                }
                future.complete(productos);
            }

            @Override
            public void onCancelled(DatabaseError error) {
                future.completeExceptionally(error.toException());
            }
        });

        return future;
    }

    public CompletableFuture<Producto> createProducto(Producto producto) {
        CompletableFuture<Producto> future = new CompletableFuture<>();
        
        DatabaseReference newRef = databaseReference.push();
        producto.setId(newRef.getKey());
        
        newRef.setValue(producto, (error, ref) -> {
            if (error != null) {
                future.completeExceptionally(error.toException());
            } else {
                future.complete(producto);
            }
        });

        return future;
    }

    public CompletableFuture<Producto> updateProducto(String id, Producto producto) {
        CompletableFuture<Producto> future = new CompletableFuture<>();
        
        databaseReference.child(id).setValue(producto, (error, ref) -> {
            if (error != null) {
                future.completeExceptionally(error.toException());
            } else {
                producto.setId(id);
                future.complete(producto);
            }
        });

        return future;
    }

    public CompletableFuture<Void> deleteProducto(String id) {
        CompletableFuture<Void> future = new CompletableFuture<>();
        
        databaseReference.child(id).removeValue((error, ref) -> {
            if (error != null) {
                future.completeExceptionally(error.toException());
            } else {
                future.complete(null);
            }
        });

        return future;
    }
} 